#!/bin/bash

# Script for creating Symlinks inside the "public/" folder 
# that point to versions inside the "docs/" folder. This 
# process is done to enable the NonProfit view during development.
# Only works for Unix like systems (MacOS, Linux).

# Deleting Old Symlinks inside public
cd public
for f in *; do 
  if [[ -L "$f" ]]; then
    rm $f
    echo "Deleted $f old Symlink file"
  fi
done

# Creating the New Symlinks 
for f in ../docs/*; do
  if [[ -d $f && $f != "../docs/static" && ! -L "$f" ]]; then
    ln -s $f .
    echo "Created new ${f: 8} Symlink file"
  fi
done

cd ..
