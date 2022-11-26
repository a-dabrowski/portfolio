for image in *.jpg; 
do 
  WEBP=$(echo $image | sed -e "s/jpg/webp/g");
  cwebp -q 100 "$image" -o "$WEBP";
  
done
