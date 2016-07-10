/**************************************
  author:Autmn
  date:2016/7/10
  context:js实现图片流瀑布效果
  method:
  		1、先排好第一排的图片，获取第一排图片的高度，并放入一个存放高度的数组里面。
  		2、找出第一排高度最小的值和它的索引号，开始排第二排。利用绝对定位将图片放到高度最小值
			下面。并将其对应索引号数组的高度值改变(即，原来的高度+排放图片的高度）。
		3、按照步骤2的方法，找到最小高度，排放图片。继续排下去。
		4、模拟ajax数据，实现无限加载
		5、监听滚动条，当滚动高度+页面高度大于最后一张图片距离顶部时，进入动态加载图片。
**************************************/

var boxHeightArr = [];
var m_parent;

window.onload = function () {
	m_parent = document.getElementById("container");
	var imgDate = {
		img:['1.png','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg']
	};

	loadImage("box");
	window.onscroll = function () {
		var scrollHeight = document.documentElement.scrollTop||document.body.scrollTop;
	    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
		var boxNum = getChildElement("box");
		var height =boxNum[boxNum.length-1].offsetTop; 
		if (height<scrollHeight+pageHeight) {
			for(var i=0; i<imgDate.img.length; i++ ){
				var boxdiv = document.createElement('div');
				boxdiv.className = 'box';
				m_parent.appendChild(boxdiv);
				var boxImgDiv = document.createElement('div');
				boxImgDiv.className = 'box_img';
				boxdiv.appendChild(boxImgDiv);
				var img = document.createElement('img');
				img.src = "image/"+imgDate.img[i];
				
				boxImgDiv.appendChild(img);
				
			}
			loadImage("box");
			console.log(Math.max.apply(null,boxHeightArr));

		}

	}
}
function loadImage(context) {
	var imgNum = getChildElement(context);
	// console.log(imgNum);
	imgSize = imgNum[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/imgSize);
	m_parent.style.cssText = "width:"+imgSize*cols+"px;margin:0px auto;";

	
	var minHeight;
	var minHeightIndex;
	for(var i=0; i<imgNum.length; i++){
		if(i<cols){
			boxHeightArr[i]=imgNum[i].offsetHeight;
		}else{
			minHeight = Math.min.apply(null,boxHeightArr);
			minHeightIndex = getminHeightIndex(boxHeightArr,minHeight);
			boxHeightArr[minHeightIndex]+=imgNum[i].offsetHeight;
			imgNum[i].style.position = "absolute";
			imgNum[i].style.top = minHeight+"px";
			imgNum[i].style.left = imgNum[minHeightIndex].offsetLeft+"px";
		}

	}
}

function getminHeightIndex(boxHeightArr,minHeight) {
	for(var i = 0; i<boxHeightArr.length; i++){
		if(boxHeightArr[i]==minHeight){
			return i;
		}
	}
}

function getChildElement(context) {

	var arrImg = [];
	var allbox = m_parent.getElementsByTagName("*");
	for(var i = 0; i < allbox.length; i++ ){
		if(allbox[i].className==context){
			arrImg.push(allbox[i]);
		}
	}
	
	return arrImg;
}