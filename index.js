fetch('terminology.json')
  .then(response => response.json())
  .then(data => {
    const terminology = data;
    makeListData(terminology);
    getAnswerDefinition(terminology);
  })

function getAnswerDefinition(terminology) {
    const length = terminology.length;
    console.log(length);
    return terminology[Math.random() * length]
}

function displayDataItem(item){
  const name = document.createElement('dt');
  name.innerText = item.name;
  const defin = document.createElement('dd');
  defin.innerText = item.def;
  const p = document.createElement('p');
  p.append(name, defin);
  return p;
}

function makeListData(terminology) {
  const demo = document.getElementById('demo');
  const list = document.createElement('dl');
  for(let i = 0; i < terminology.length; i++) {
    list.appendChild(displayDataItem(terminology[i]));
  }
  demo.appendChild(list);
}
