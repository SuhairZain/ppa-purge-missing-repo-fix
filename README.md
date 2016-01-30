# ppa-purge-missing-repo-fix
Ever did a ppa-purge, only to discover that you've lost a lot of important packages? I did and thus I wrote a script to install the missing packages automagically by just entering the list of packages that ppa-purge warned about. It generates a line of the format

```bash
for i in *package1* *package2*; do sudo apt-get install *-y* $i; done
```

Simply paste this on a terminal and sit back while it does its work.

## Usage
1. Clone this repo using ```git clone https://github.com/SuhairZain/ppa-purge-missing-repo-fix.git```
2. cd to the directory _ppa-purge-missing-repo-fix_ using ```cd ppa-purge-missing-repo-fix```
3. Run the script using ```node main.js``` with optional parameters ```--verbose --input --output --ask```

For an example, run ```node main.js --input example/input.txt --output example/output.txt```
