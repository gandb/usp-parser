
"use strict";

interface SlicePie
{
	parent:Pie;
	index:number;
	percent:number;
	color:string;
	draw():void;
}

interface Pie
{
	slices:Array<SlicePie>; 
	currentPorcent:number;
	draw():void;
}



class PieBase implements Pie
{

	slices:Array<SlicePie>=new Array<SlicePie>();  
	currentPorcent:number=0;
	
	constructor()
	{ 
	}

	draw(){}
	
}

class PieDOM extends PieBase
{
 
	path:string;
	elementDOMSVG=null; 

	constructor(path:string,backgroundColor:Color)
	{
		super();
		this.path=path;
		this.elementDOMSVG = document.querySelector(path);
 
		if(this.elementDOMSVG ==null)
		{
			throw new Error(`SVG DOM Path [${path}] is incorret`);
		}

		let oldStyle = this.elementDOMSVG.getAttribute("style");
		this.elementDOMSVG.setAttribute("style",`background-color:rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b},${backgroundColor.a});${oldStyle}`); 
	
	}

	draw(){}
	
}

abstract class SlicePieBase implements SlicePie
{

	index:number=0;
	percent:number;
	parent:Pie;
	color:string;
	abstract draw():void;

	constructor(parent:Pie,index:number,color:string,percent:number)
	{
		this.parent = parent;
		this.index = index;
		this.color = color;
		this.percent=percent;
	}

}

class SliceDegradee extends SlicePieBase
{
	  
	elementDOMSVG:SVGElement;


	constructor(parent:Pie,index:number,color:string,elementDOMSVG:SVGElement)
	{
		super(parent,index,color,0.01);

		if(elementDOMSVG==null)
		{
			throw new Error("SVGElement is null");
		}
		this.elementDOMSVG = elementDOMSVG;
	}

		
	getCoordinatesForPercent(percent) {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return [x, y];
	}

	draw():void
	{
		// destructuring assignment sets the two variables at once
		const [startX, startY] = this.getCoordinatesForPercent(this.parent.currentPorcent);
		
		// each slice starts where the last slice ended, so keep a cumulative percent
		this.parent.currentPorcent += this.percent;
		
		const [endX, endY] =  this.getCoordinatesForPercent(this.parent.currentPorcent);
	
		// if the slice is more than 50%, take the large arc (the long way around)
		const largeArcFlag = this.percent > .5 ? 1 : 0;
	
		// create an array and join it just for code readability
		const pathData = [
		`M ${ startX} ${startY}`, // Move
		`A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
		`L 0 0`, // Line
		].join(' ');
	
		// create a <path> and append it to the <svg> element
	 
		const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		pathEl.setAttribute('d', pathData);
		pathEl.setAttribute('fill', this.color);
		this.elementDOMSVG.appendChild(pathEl);
		 
		
	}
}

interface Color
{
	r:number;
	g:number;
	b:number;
	a?:number;
}

class PieStatic extends PieDOM
{
 
	constructor(path:string,color:Color,background:Color, percent:number)
	{
		super(path,background);

		for(let index=0;index<percent;index++)
		{
			let alpha:number = (index+1) / 100;
			let item:SliceDegradee = new SliceDegradee(this,index, `rgba(${color.r}, ${color.g}, ${color.b},${alpha})`,this.elementDOMSVG);
			this.slices.push(item);
		} 
	}

	draw():void
	{
	 
		this.slices.forEach(slice =>  slice.draw()); 
	}
	
}
  


class PieSucess extends PieStatic
{
 
	constructor(path:string,backgroundColor?:Color)
	{
		super(path,{r:30,g:144,b:255},(backgroundColor)?backgroundColor:{r:255,g:255,b:255,a:1},100); 
	} 
	
}
  


class PieFaill extends PieStatic
{
 
	constructor(path:string,backgroundColor?:Color)
	{
		super(path,{r:231,g:76,b:60},(backgroundColor)?backgroundColor:{r:255,g:255,b:255,a:1},100); 
	} 
	
}
  
