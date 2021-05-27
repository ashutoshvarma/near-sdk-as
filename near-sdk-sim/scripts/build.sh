#!/usr/bin/env bash
# Cross compile the crate using cross
# NOTE: Install cross - `cargo install cross`

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

OUT_DIR="${SCRIPT_DIR}/../bin"
mkdir -p ${OUT_DIR}

CRATE_NAME="near_sim_bindings"

targets=(
    ## Win Targets (MinGW)
    # "win32_x32 i686-pc-windows-gnu"
    # "win32_x64 x86_64-pc-windows-gnu"
    ## Linux Targets
    # "linux_x32 i686-unknown-linux-gnu"
    "linux_x64 x86_64-unknown-linux-gnu"
    ## MacOS Targets
    # "darwin_x64 x86_64-apple-darwin"
)

function build {
    _output="${OUT_DIR}/$1.node"
    _target="$2"
    cross build --target "${_target}" --release && \
          cp "${SCRIPT_DIR}/../target/${_target}/release/lib${CRATE_NAME}.so" "${_output}" && \
          strip ${_output}
}



for i in "${targets[@]}"
do
    set -- $i
    echo "Compiling \"$1\" for target $2"
    if ! build "$1" "$2"; then
        echo "Failed to compile for target \"$2\"" 
        echo
    fi
done
