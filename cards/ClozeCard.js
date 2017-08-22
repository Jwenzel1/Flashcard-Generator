function ClozeCard(text, cloze){
  if(!(this instanceof ClozeCard)){
    return new ClozeCard(text, cloze);
  }
  this.fullText = text;
  this.cloze = cloze;
  if(text.includes(cloze)){
    this.partial = text.replace(cloze, "______");
  }
  else{
    throw Error("Your Cloze does not appear in your Text!");
  }
}

module.exports = ClozeCard;
