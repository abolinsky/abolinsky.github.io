// Find intersection of RAY & SEGMENT
function getIntersection(ray,segment){
// RAY in parametric: Point + Delta*T1
var r_px = ray.a.x;
var r_py = ray.a.y;
var r_dx = ray.b.x-ray.a.x;
var r_dy = ray.b.y-ray.a.y;
// SEGMENT in parametric: Point + Delta*T2
var s_px = segment.a.x;
var s_py = segment.a.y;
var s_dx = segment.b.x-segment.a.x;
var s_dy = segment.b.y-segment.a.y;
// Are they parallel? If so, no intersect
var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
  // Unit vectors are the same.
  return null;
}
var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
var T1 = (s_px+s_dx*T2-r_px)/r_dx;
// Must be within parametic whatevers for RAY/SEGMENT
if(T1<0) return null;
if(T2<0 || T2>1) return null;
  // Return the POINT OF INTERSECTION
  return {
    x: r_px+r_dx*T1,
    y: r_py+r_dy*T1,
    param: T1
  };
}
function getSightPolygon(sightX,sightY){
  // Get all unique points
  var points = (function(segments){
    var a = [];
    segments.forEach(function(seg){
      a.push(seg.a,seg.b);
    });
    return a;
  })(segments);
  var uniquePoints = (function(points){
    var set = {};
    return points.filter(function(p){
      var key = p.x+","+p.y;
      if(key in set){
        return false;
      }else{
        set[key]=true;
        return true;
      }
    });
  })(points);
  // Get all angles
  var uniqueAngles = [];
  for(var j=0;j<uniquePoints.length;j++){
    var uniquePoint = uniquePoints[j];
    var angle = Math.atan2(uniquePoint.y-sightY,uniquePoint.x-sightX);
    uniquePoint.angle = angle;
    uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
  }
  // RAYS IN ALL DIRECTIONS
  var intersects = [];
  for(var j=0;j<uniqueAngles.length;j++){
    var angle = uniqueAngles[j];
    // Calculate dx & dy from angle
    var dx = Math.cos(angle);
    var dy = Math.sin(angle);
    // Ray from center of screen to mouse
    var ray = {
      a:{x:sightX,y:sightY},
      b:{x:sightX+dx,y:sightY+dy}
    };
    // Find CLOSEST intersection
    var closestIntersect = null;
    for(var i=0;i<segments.length;i++){
      var intersect = getIntersection(ray,segments[i]);
      if(!intersect) continue;
      if(!closestIntersect || intersect.param<closestIntersect.param){
        closestIntersect=intersect;
      }
    }
    // Intersect angle
    if(!closestIntersect) continue;
    closestIntersect.angle = angle;
    // Add to list of intersects
    intersects.push(closestIntersect);
  }
  // Sort intersects by angle
  intersects = intersects.sort(function(a,b){
    return a.angle-b.angle;
  });
  // Polygon is intersects, in order of angle
  return intersects;
}
///////////////////////////////////////////////////////
// DRAWING
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var posOfLight = canvas.height+15;
var activateMouse = 0;
function calculateTheta() {
  var x = Math.abs((canvas.width/2)-Mouse.x);
  var y = Mouse.y;
  var theta = Math.atan(y/x);
  return theta;
}
function draw(){
  // Clear canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  segments[4].a.x = (canvas.width/2)-10;
  segments[4].a.y = 52;
  segments[4].b.x = (canvas.width/2)+10;
  segments[4].b.y = 52;
  if (activateMouse) {
    document.getElementById('background').style.display = 'inline';
    document.getElementById('canvas').style.backgroundColor = '#fff';
    ctx.strokeStyle = "#e9e9e9";
    ctx.fillStyle = "#e9e9e9";
  } else {
    document.getElementById('background').style.display = 'none';
    document.getElementById('canvas').style.backgroundColor = '#000';
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
  }
  // Draw segments
  for(var i=0;i<segments.length;i++){
    var seg = segments[i];
    ctx.beginPath();
    ctx.moveTo(seg.a.x,seg.a.y);
    ctx.lineTo(seg.b.x,seg.b.y);
    ctx.stroke();
  }
  ctx.fill();
  // Sight Polygons
  var fuzzyRadius = 10;
  var polygon = [getSightPolygon((canvas.width/2),posOfLight+50)];
  // DRAW AS A GIANT POLYGON
  if (activateMouse) {
    drawPolygon(polygon[0],ctx,"#CCC");
  }
  // Light rising
  // Draw red dots
  if (activateMouse) {
    ctx.fillStyle = "#ffd700";
  } else {
    if (posOfLight < canvas.height-30 && posOfLight > canvas.height-200 ||
        posOfLight < canvas.height-300 && posOfLight > canvas.height-350 ||
        posOfLight < 200 && posOfLight > 180 ||
        posOfLight < 50 && posOfLight > 40 ||
        posOfLight < 30 && posOfLight > 25 ||
        posOfLight < 22 && posOfLight > 20 ||
        posOfLight < 19 && posOfLight > 18 ||
        posOfLight < 16 && posOfLight > 15 ||
        posOfLight < 12.5 && posOfLight > 12 ||
        posOfLight < 11.5 && posOfLight > 11 ||
        posOfLight < 10.2 && posOfLight > 10.5
        ) {
      ctx.fillStyle = "#ffd700";
    } else {
      ctx.fillStyle = "#333";
    }
  }
  ctx.beginPath();
  ctx.arc((canvas.width/2), posOfLight+50, 10, 0, 2*Math.PI, false);
  ctx.fill();
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.arc((canvas.width/2), posOfLight+53, 17, 0, Math.PI, true);
  ctx.fill();
  for(var angle=0;angle<Math.PI*2;angle+=(Math.PI*2)/10){
    var dx = Math.cos(angle)*fuzzyRadius;
    var dy = Math.sin(angle)*fuzzyRadius;
    ctx.beginPath();
    ctx.arc((canvas.width/2), posOfLight+50, 2, 0, 2*Math.PI, false);
    ctx.fill();
  }
  if (posOfLight > .5) {
    posOfLight -= posOfLight/(canvas.height/8);
  } else {
    activateMouse = 1;
  }
  ctx.strokeStyle = "#222";
  ctx.lineWidth = "1";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2,-1);
  ctx.lineTo(canvas.width/2,posOfLight+36);
  ctx.stroke();
}
// LINE SEGMENTS
var segments = [
// Border
{a:{x:-1,y:-1}, b:{x:-1,y:canvas.height+1}},
{a:{x:-1,y:canvas.height+1}, b:{x:canvas.width+1,y:canvas.height+1}},
{a:{x:canvas.width+1,y:canvas.height+1}, b:{x:canvas.width+1,y:-1}},
{a:{x:canvas.width+1,y:-1}, b:{x:-1,y:-1}},
{a:{x:0,y:0}, b:{x:0,y:0}}
];
function drawPolygon(polygon,ctx,fillStyle){
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(polygon[0].x,polygon[0].y);
  for(var i=1;i<polygon.length;i++){
    var intersect = polygon[i];
    ctx.lineTo(intersect.x,intersect.y);
  }
  ctx.fill();
}
window.onload = setInterval(draw,1);
// MOUSE
var Mouse = {
  x: canvas.width/2,
  y: canvas.height/2
};
canvas.onmousemove = function(event){
  Mouse.x = event.clientX;
  Mouse.y = event.clientY;
};
