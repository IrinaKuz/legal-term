fetch('terminology.json')
  .then(response => response.json())
  .then(data => {
    const terminology = data;
    makeListData(terminology);
    getAnswerDefinition(terminology);
    document.getElementById('search').addEventListener('input', function() {
      const input = this.value;
      console.log(input);
      searchTerm(input, terminology);
    })
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
  // delete all data
  demo.innerHTML = '';
  const list = document.createElement('dl');
  for(let i = 0; i < terminology.length; i++) {
    list.appendChild(displayDataItem(terminology[i]));
  }
  demo.appendChild(list);
}

document.getElementsByTagName('form')[0].addEventListener('submit', function(e) {
  e.preventDefault();
});

function searchTerm(value, terminology) {
  if(value === '') {
    makeListData(terminology);
  } else {
    const regex = new RegExp('\\b' + value, 'gi');
    console.log(regex);
    const found = terminology.filter(term => {
      console.log(term.name);
      if(term.name.match(regex))
        return true;
    })
    console.log(found);
    makeListData(found);
  }
  
}
