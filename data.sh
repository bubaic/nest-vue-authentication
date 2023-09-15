file=data.db
if [ ! -e "$file" ]; then echo "Ok"; else touch "$file"; fi
