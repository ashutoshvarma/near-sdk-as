import { NearAccount, Runner, toYocto } from "near-runner-ava";
import { main } from "asbuild";
import { join } from "path";

const ALICE = "alice.test.near";
const BOB = "bob.test.near";
const SINGLETON = "singleton.test.near";

async function compile(contract: string): Promise<void> {
  function asb(succ: any, fail: any) {
    main(
      [
        join(__dirname, "../assembly/__tests__", contract + ".ts"),
        "--target",
        "debug",
        "--wat",
      ],
      {},
      (err) => {
        if (err) {
          throw err;
          return -1;
        } else {
          succ();
          return 1;
        }
      }
    );
  }
  return new Promise(asb);
}

  test("shouldn't allow methods with the same name as init function", async () => {
    try {
      await compile("singleton-fail");
      expect(true).toBe(false);
    } catch (e: any) {
      expect(e.message).toContain(
        `Method "new" already used; cannot export constructor using the same name.`
      );
    }
  });
});

  jest.setTimeout(150_000);

  const runner = Runner.create(async ({ root }) => {
    const alice = await root.createAccount(ALICE, {
      initialBalance: toYocto("200"),
    });
    const bob = await root.createAccount(BOB, {
      initialBalance: toYocto("200"),
    });
    const singleton = await root.createAndDeploy(
      SINGLETON,
      __dirname + "/../build/debug/singleton.wasm"
    );
    return { alice, bob, singleton };
  });

  async function init(alice: NearAccount) {
    return await alice.call(SINGLETON, "new", { owner: ALICE });
  }

  runner.test("should only initialize once", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let _init = async () => await init(alice);
      await expect(_init()).rejects.toThrowError(
        "contract is already initialized"
      );
    });
  });

  runner.test("shouldn't work if not initialized", (async ({ alice, bob, singleton }) => {
      let res = async () => await alice.call(SINGLETON, "owner", {});
      await expect(res()).rejects.toThrowError("contract is not initialized");
    });
  });

  runner.test("should return owner", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = await singleton.view("owner");
      await expect(res).toStrictEqual(ALICE);
    });
  });

  runner.test("should be able to visit", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = await bob.call_raw(SINGLETON, "visit", {});
      expect(res.logs).toContainEqual(
        "Visited the first time by bob.test.near"
      );
      expect(await singleton.view("hasVisited", { visitor: BOB })).toBe(true);
      expect(await singleton.view("lastVisited", {})).toBe(BOB);
    });
  });

  runner.test("should be able to visit without decorator", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = await bob.call_raw(
        SINGLETON,
        "visit_without_updated_decorator",
        {}
      );
      expect(res.logs).toContainEqual(
        "Visited the first time by bob.test.near"
      );
      expect(await singleton.view("hasVisited", { visitor: BOB })).toBe(true);
      expect(await singleton.view("lastVisited", {})).toBe(BOB);
    });
  });

  test.concurrent(
    "should not update state to visit_without_change decorator",
    async () => {
      await runner.run(async ({ alice, bob, singleton }) => {
        await init(alice);
        let res = await bob.call_raw(SINGLETON, "visit_without_change", {});
        expect(res.logs).toContainEqual(
          "Visited the first time by bob.test.near"
        );
        expect(await singleton.view("lastVisited")).toBe("NULL");
      });
    }
  );

  runner.test("should not have private methods", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = async () => await alice.call(SINGLETON, "hasNotVisited", {});
      await expect(res()).rejects.toThrowError("Contract method is not found");
    });
  });

  runner.test("should not allow contract private methods", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = async () => await alice.call(SINGLETON, "privateMethod", {});
      await expect(res()).rejects.toThrowError(
        "Only singleton.test.near can call this method"
      );
    });
  });

  test.concurrent(
    "should allow contract private methods if called by contract",
    async () => {
      await runner.run(async ({ alice, bob, singleton }) => {
        await init(alice);
        const res = await alice.call(SINGLETON, "callPrivate", {});
        expect(res).toStrictEqual("in private method");
      });
    }
  );

  runner.test("works with static members", (async ({ alice, bob, singleton }) => {
      await init(alice);
      let res = await singleton.view("get_storage_key");
      expect(res).toEqual("key");
    });
  });
});