"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posixRelativePath = void 0;
//@ts-ignore
let path = require("path");
function posixRelativePath(from, to) {
    const relativePath = path.relative(from, to);
    return relativePath.split(path.sep).join(path.posix.sep);
}
exports.posixRelativePath = posixRelativePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsWUFBWTtBQUNaLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUzQixTQUFnQixpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsRUFBVTtJQUN4RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFIRCw4Q0FHQyIsInNvdXJjZXNDb250ZW50IjpbIi8vQHRzLWlnbm9yZVxubGV0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l4UmVsYXRpdmVQYXRoKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pO1xuICByZXR1cm4gcmVsYXRpdmVQYXRoLnNwbGl0KHBhdGguc2VwKS5qb2luKHBhdGgucG9zaXguc2VwKTtcbn0iXX0=