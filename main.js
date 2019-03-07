const d = {}; 
const svg = document.querySelector('svg'); 
const svgNS = 'http://www.w3.org/2000/svg';
let c1;
let c2;
let c3;
let path;
let drag;

svg.addEventListener('click', clHandler);
function clHandler(e) {
    if (e.srcElement instanceof SVGCircleElement) return;
    const circle = document.createElementNS(svgNS, 'circle');
    const rect = e.target.getBoundingClientRect();
    circle.setAttribute("cx", e.clientX - rect.left);
    circle.setAttribute("cy",e.clientY - rect.top);
    circle.setAttribute("r",5);
    circle.setAttribute("fill","black");
    circle.setAttribute("stroke","transparent");
    svg.appendChild(circle);
    if (document.querySelectorAll('circle').length === 3) {
        svg.removeEventListener('click', clHandler);
        [c1, c2, c3] = [...document.querySelectorAll('circle')];
        path = document.createElementNS(svgNS, 'path');
        Object.assign (d, { 
            x1: c1.getAttribute('cx'),
            y1: c1.getAttribute('cy'),
            x2: c2.getAttribute('cx'),
            y2: c2.getAttribute('cy'),
            x3: c3.getAttribute('cx'),
            y3: c3.getAttribute('cy')    
        })
        path.setAttribute('d', `M${d.x1} ${d.y1} Q ${d.x2} ${d.y2} ${d.x3} ${d.y3}`);
        path.setAttribute('stroke', 'red');
        path.setAttribute('fill', 'transparent');
        path.setAttribute('stroke-width', '5');
        svg.appendChild(path);
    }
}


svg.addEventListener("mousedown",mdHandler);
function mdHandler(e){
  if (e.srcElement instanceof SVGCircleElement){
    drag = e.srcElement;
    Object.assign(drag, {
        x: e.srcElement.getAttribute("cx"),
        y: e.srcElement.getAttribute("cy"),
        clientX: e.clientX,
        clientY: e.clientY
    })
    
    svg.addEventListener("mousemove",mmHandler);
    svg.addEventListener("mouseup",muHandler);
  }
}

function mmHandler(e){
  drag.setAttribute("cx",e.clientX - (drag.clientX - drag.x));
  drag.setAttribute("cy",e.clientY - (drag.clientY - drag.y));
  
  switch(drag){
    case c1:
      d.x1 = drag.getAttribute("cx");
      d.y1 = drag.getAttribute("cy"); 
      break;    
    case c2:
      d.x2 = drag.getAttribute("cx");
      d.y2 = drag.getAttribute("cy"); 
      break;
    case c3:
      d.x3 = drag.getAttribute("cx");
      d.y3 = drag.getAttribute("cy"); 
      break;      
  }

  path.setAttribute("d",`M${d.x1} ${d.y1} Q ${d.x2} ${d.y2} ${d.x3} ${d.y3}`);
}
function muHandler(e){
  svg.removeEventListener("mousemove",mmHandler);
  svg.removeEventListener("mouseup",muHandler);
}

document.querySelector('button').addEventListener('click', butHandler);
function butHandler(e) {
    svg.innerHTML = '';
    svg.addEventListener('click', clHandler);

}