# git-format-staged

[![Build Status](https://travis-ci.org/hallettj/git-format-staged.svg?branch=master)](https://travis-ci.org/hallettj/git-format-staged)

Consider a project where you want all code formatted consistently. So you use
a formatting command. (For example I use [prettier][] in my Javascript and
Typescript projects.) You want to make sure that everyone working on the project
runs the formatter, so you use a tool like [husky][] to install a git pre-commit
hook. The naive way to write that hook would be to:

- get a list of staged files
- run the formatter on those files
- run `git add` to stage the results of formatting

The problem with that solution is it forces you to commit entire files. At
worst this will lead to contributors to unwittingly committing changes. At
best it disrupts workflow for contributors who use `git add -p`.

git-format-staged tackles this problem by running the formatter on the staged
version of the file. Staging changes to a file actually produces a new file
that exists in the git object database. git-format-staged uses some git
plumbing commands to send content from that file to your formatter. The command
replaces file content in the git index. The process bypasses the working tree,
so any unstaged changes are ignored by the formatter, and remain unstaged.

After formatting a staged file git-format-staged computes a patch which it
attempts to apply to the working tree file to keep the working tree in sync
with staged changes. If patching fails you will see a warning message. The
version of the file that is committed will be formatted properly - the warning
just means that working tree copy of the file has been left unformatted. The
patch step can be disabled with the `--no-update-working-tree` option.

[prettier]: https://prettier.io/
[husky]: https://www.npmjs.com/package/husky

## How to install

### Install with Nix

Install via the CLI:

    $ nix profile add github:hallettj/git-format-staged

Or add to your flake imports, and use the `default` package output.

### Install with NPM

Requires Python version 3 or 2.7.

Install as a development dependency in a project that uses npm packages:

    $ npm install --save-dev git-format-staged

Or install globally:

    $ npm install --global git-format-staged

### Or just copy the script

Requires Python version 3 or 2.7.

If you do not use the above methods you can copy the
[`git-format-staged`](./git-format-staged) script from this repository and
place it in your executable path. The script is MIT-licensed - so you can check
the script into version control in your own open source project if you wish.

## How to use

For detailed information run:

    $ git-format-staged --help

The command expects a shell command to run a formatter, and one or more file
patterns to identify which files should be formatted. For example:

    $ git-format-staged --formatter 'prettier --stdin-filepath "{}"' 'src/*.js'

That will format all files under `src/` and its subdirectories using
`prettier`. The file pattern is tested against staged files using Python's
[`fnmatch`][] function: each `*` will match nested directories in addition to
file names.

[`fnmatch`]: https://docs.python.org/3/library/fnmatch.html#fnmatch.fnmatch

The formatter command must read file content from `stdin`, and output formatted
content to `stdout`.

Note that the syntax of the `fnmatch` glob match is a is a bit different from
normal shell globbing. So if you need to match multiple patterns, you should
pass multiple arguments with different patterns, and they will be grouped.
So instead of e.g. `'src/**/*.{js,jsx,ts}'`, you would use:

    $ git-format-staged --formatter 'prettier --stdin-filepath "{}"' 'src/*.js' 'src/*.jsx' 'src/*.ts'

Files can be excluded by prefixing a pattern with `!`. For example:

    $ git-format-staged --formatter 'prettier --stdin-filepath "{}"' '*.js' '!flow-typed/*'

Patterns are evaluated from left-to-right: if a file matches multiple patterns
the right-most pattern determines whether the file is included or excluded.

git-format-staged never operates on files that are excluded from version
control. So it is not necessary to explicitly exclude stuff like
`node_modules/`.

The formatter command may include a placeholder, `{}`, which will be replaced
with the path of the file that is being formatted. This is useful if your
formatter needs to know the file extension to determine how to format or to
lint each file. For example:

    $ git-format-staged -f 'prettier --stdin-filepath "{}"' '*.js' '*.css'

Do not attempt to read or write to `{}` in your formatter command! The
placeholder exists only for referencing the file name and path.

### Check staged changes with a linter without formatting

Perhaps you do not want to reformat files automatically; but you do want to
prevent files from being committed if they do not conform to style rules. You
can use git-format-staged with the `--no-write` option, and supply a lint
command instead of a format command. Here is an example using ESLint:

    $ git-format-staged --no-write -f 'eslint --stdin --stdin-filename "{}" >&2' 'src/*.js'

If this command is run in a pre-commit hook, and the lint command fails the
commit will be aborted and error messages will be displayed. The lint command
must read file content via `stdin`. Anything that the lint command outputs to
`stdout` will be ignored. In the example above `eslint` is given the `--stdin`
option to tell it to read content from `stdin` instead of reading files from
disk, and messages from `eslint` are redirected to `stderr` (using the `>&2`
notation) so that you can see them.

### Set up a pre-commit hook with Husky

Follow these steps to automatically format all Javascript files on commit in
a project that uses npm.

Install git-format-staged, husky, and a formatter (I use `prettier`):

    $ npm install --save-dev git-format-staged husky prettier

Add a `prepare` script to install husky when running `npm install`:

    $ npm set-script prepare "husky install"
    $ npm run prepare

Add the pre-commit hook:

    $ npx husky add .husky/pre-commit "git-format-staged --formatter 'prettier --stdin-filepath \"{}\"' '*.js' '*.ts'"
    $ git add .husky/pre-commit

Once again note that the formatter command and the `'*.js'` and `'*.ts'`
patterns are quoted!

That's it! Whenever a file is changed as a result of formatting on commit you
will see a message in the output from `git commit`.

## Comparisons to similar utilities

There are other tools that will format or lint staged files. What distinguishes
git-format-staged is that when a file has both staged and unstaged changes
git-format-staged ignores the unstaged changes; and it leaves unstaged changes
unstaged when applying formatting.

Some linters (such as [precise-commits][]) have an option to restrict linting
to certain lines or character ranges in files, which is one way to ignore
unstaged changes while linting. The author is not aware of a utility other than
git-format-staged that can apply any arbitrary linter so that it ignores
unstaged changes.

Some other formatting utilities (such as [pre-commit][])
use a different strategy to keep unstaged changes unstaged:

1. stash unstaged changes
2. apply the formatter to working tree files
3. stage any resulting changes
4. reapply stashed changes to the working tree.

The problem is that you may get a conflict where stashed changes cannot be
automatically merged after formatting has been applied. In those cases the user
has to do some manual fixing to retrieve unstaged changes. As far as the author
is aware git-format-staged is the only utility that applies a formatter without
touching working tree files, and then merges formatting changes to the working
tree. The advantage of merging formatting changes into unstaged changes (as
opposed to merging unstaged changes into formatting changes) is that
git-format-staged is non-lossy: if there are conflicts between unstaged changes
and formatting the unstaged changes win, and are kept in the working tree,
while staged/committed files are formatted properly.

Another advantage of git-format-staged is that it has no dependencies beyond
Python and git, and can be dropped into any programming language ecosystem.

Some more comparisons:

- [lint-staged][] lints and formats staged files. At the time of this writing
  it does not have an official strategy for ignoring unstaged changes when
  linting, or for keeping unstaged changes unstaged when formatting. But
  lint-staged does provide powerful configuration options around which files
  should be linted or formatted, what should happen before and after linting,
  and so on.
- [pretty-quick][] formats staged files with prettier. By default pretty-quick
  will abort the commit if files are partially staged to allow the user to
  decide how to re-stage changes from formatting. The result is more manual
  effort compared to git-format-staged.
- the one-liner
  `git diff --diff-filter=d --cached | grep '^[+-]' | grep -Ev '^(--- a/|\+\+\+ b/)' | LINT_COMMAND`
  (described [here][lint changed hunks]) extracts changed hunks and feeds them
  to a linter. But linting will fail if the linter requires the entire file for
  context. For example a linter might report errors if it cannot see import
  lines.

[precise-commits]: https://github.com/nrwl/precise-commits
[pre-commit]: https://pre-commit.com/#pre-commit-during-commits
[pretty-quick]: https://www.npmjs.com/package/pretty-quick
[lint-staged]: https://github.com/okonet/lint-staged
[lint changed hunks]: https://github.com/okonet/lint-staged/issues/62#issuecomment-383217916
