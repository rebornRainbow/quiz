const MATCH_LIST = {
	'there': 'their',
	'their': 'there',
	'they\'re': 'there',
	'There': 'Their',
	'Their': 'There',
	'They\'re': 'There',
	'THERE': 'THEIR',
	'THEIR': 'THERE',
	'THEY\'RE': 'THERE',
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  
  //查看节点如果是元素的话就差看他的子节点，
  if(node.nodeType === 3)
  {//是文本
	for(var key in MATCH_LIST)
	{
		node.textContent = node.textContent.replaceAll(key,'__'+key+"__");
	}
	for(var key in MATCH_LIST)
	{
		node.textContent = node.textContent.replaceAll('__'+key+"__",MATCH_LIST[key]);
	}
	return;
  }else
  {//不是文本
	//遍历所有节点
	cn = node.childNodes;
	for(let elem of cn)
	{
		transformTextNodes(elem)
	}
  }
  
}
const url = chrome.runtime.getURL('images/rose-cursor.gif');
body = document.querySelector('*');
body.style.cursor = 'url('+url+') , auto !important';


transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
