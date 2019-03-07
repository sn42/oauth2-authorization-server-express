import del from "del";
import gulp from "gulp";
import nodemon from "gulp-nodemon";
import tslint from "gulp-tslint";
import ts from "gulp-typescript";

const tsProject = ts.createProject("tsconfig.json");

/**
 * Clean the dist dir.
 */
export function clean() {
  return del("./dist/**");
}

/**
 * Compile the typescript files.
 */
function compileScripts() {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("./dist"));
}

/**
 * Lint typescript files.
 */
function lintScripts() {
  return gulp
    .src("./src/**/*.ts")
    .pipe(
      tslint({
        formatter: "verbose"
      })
    )
    .pipe(tslint.report());
}

export const build = gulp.parallel(compileScripts, lintScripts);

function runNodemon() {
  return nodemon({
    script: "./dist/index.js",
    ext: "ts",
    watch: ["src"],
    tasks: ["build"]
  });
}

export const watch = gulp.series(clean, build, runNodemon);

export default gulp.series(clean, build);
