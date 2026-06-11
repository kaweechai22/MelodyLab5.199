
const rebuiltTopicModes = new Set(["soundReflection","soundRefraction","soundDiffraction","soundInterference","superposition","beatsViz","standingAir","resonanceViz","resonanceAirHarmonics","dopplerViz","shockWave","soundIntensity","soundIntensityLevel","soundLevelHearing","harmonicsViz","noisePollution","applicationsSound"]);
const soundTopicModes = rebuiltTopicModes;

function vNum(id, fb){ const e=$(id); return e ? Number(e.value || fb) : fb; }
function vText(id, text){ if($(id)) $(id).textContent = text; }
function vSel(id, fb){ const e=$(id); return e ? (e.value || fb) : fb; }
function lim(x,a,b){ return Math.max(a, Math.min(b, x)); }

function coreArrow(ctx,x1,y1,x2,y2,color="#22d3ee",lw=3){
  ctx.save(); ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  const a=Math.atan2(y2-y1,x2-x1), h=12;
  ctx.beginPath(); ctx.moveTo(x2,y2);
  ctx.lineTo(x2-h*Math.cos(a-Math.PI/6),y2-h*Math.sin(a-Math.PI/6));
  ctx.lineTo(x2-h*Math.cos(a+Math.PI/6),y2-h*Math.sin(a+Math.PI/6));
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function corePanel(ctx,w,h,title){
  ctx.clearRect(0,0,w,h);
  const bg=ctx.createLinearGradient(0,0,w,h); bg.addColorStop(0,"#020817"); bg.addColorStop(1,"#06152e");
  ctx.fillStyle=bg; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle="rgba(148,163,184,.10)"; ctx.lineWidth=1;
  for(let x=0;x<w;x+=78){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
  for(let y=0;y<h;y+=52){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
  const p={x:44,y:76,w:w-88,h:h-126};
  ctx.fillStyle="rgba(4,18,42,.74)"; ctx.strokeStyle="rgba(88,166,255,.32)"; ctx.lineWidth=1.6;
  roundRect(ctx,p.x,p.y,p.w,p.h,18); ctx.fill(); ctx.stroke();
  ctx.fillStyle="#e8f5ff"; ctx.font="bold 20px Sarabun, system-ui, sans-serif"; ctx.textAlign="left"; ctx.fillText(title,24,34);
  return p;
}
function coreDot(ctx,x,y,r=7,color="#ff4d6d"){
  ctx.save(); const g=ctx.createRadialGradient(x,y,2,x,y,r*3);
  g.addColorStop(0,color); g.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r*3,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=color; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle="rgba(255,255,255,.9)"; ctx.lineWidth=1.3; ctx.beginPath(); ctx.arc(x,y,r+3,0,Math.PI*2); ctx.stroke();
  ctx.restore();
}
function coreWaveLine(ctx, pts, color="#22d3ee", lw=3){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=lw; ctx.beginPath(); pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.stroke(); ctx.restore();
}
function coreArcs(ctx,x,y,count,spacing,color,start,end,shift=0){
  ctx.save(); ctx.strokeStyle=color; ctx.lineWidth=2.3;
  for(let i=0;i<count;i++){
    const r=(i*spacing + shift)%(count*spacing);
    if(r<16) continue;
    ctx.globalAlpha=lim(.95-r/(count*spacing),.14,.9);
    ctx.beginPath(); ctx.arc(x,y,r,start,end); ctx.stroke();
  }
  ctx.restore();
}
function coreMetricCard(ctx,x,y,w,h,title,value,sub,color="#22d3ee"){
  ctx.save(); ctx.fillStyle="rgba(2,12,30,.78)"; ctx.strokeStyle="rgba(88,166,255,.32)"; ctx.lineWidth=1.3;
  roundRect(ctx,x,y,w,h,14); ctx.fill(); ctx.stroke();
  ctx.fillStyle="rgba(226,232,240,.80)"; ctx.font="13px Sarabun"; ctx.textAlign="left"; ctx.fillText(title,x+14,y+23);
  ctx.fillStyle=color; ctx.font="bold 22px Sarabun"; ctx.fillText(value,x+14,y+52);
  ctx.fillStyle="rgba(226,232,240,.68)"; ctx.font="12px Sarabun"; ctx.fillText(sub,x+14,y+74);
  ctx.restore();
}
function coreBar(ctx,x,y,w,h,ratio,color="#22d3ee"){
  ctx.save(); ctx.fillStyle="rgba(148,163,184,.16)"; roundRect(ctx,x,y,w,h,h/2); ctx.fill();
  ctx.fillStyle=color; roundRect(ctx,x,y,w*lim(ratio,0,1),h,h/2); ctx.fill(); ctx.restore();
}

function drawRebuiltTopic(ctx,c,p,w,h,mode){
  const time=vizState.t*0.035*(p.speed||1);
  vText("vizTimeLabel",(p.speed||1).toFixed(1)+"×");
  let panel, cx, cy;

  if(mode==="soundReflection"){
    const angle=vNum("vizAngle",35), freq=vNum("vizFreq",800); vText("vizAngleLabel",angle.toFixed(0)+"°"); vText("vizFreqLabel",freq.toFixed(0)+" Hz");
    panel=corePanel(ctx,w,h,"Sound Reflection (การสะท้อนของเสียง)"); cx=w/2; cy=panel.y+panel.h*.52;
    const wallX=panel.x+panel.w-210, hitY=cy, srcX=panel.x+145;
    const theta=angle*Math.PI/180, L=wallX-srcX-75, dy=Math.tan(theta)*L*.55;
    const inX=srcX+72, inY=hitY-dy, outX=srcX+72, outY=hitY+dy;
    drawSpeaker(ctx,srcX,inY,.86); coreArcs(ctx,srcX,inY,9,28,"rgba(34,211,238,.72)",-.8,.8,(time*18)%28);
    ctx.strokeStyle="rgba(255,255,255,.68)"; ctx.lineWidth=7; ctx.beginPath(); ctx.moveTo(wallX,panel.y+40); ctx.lineTo(wallX,panel.y+panel.h-40); ctx.stroke();
    ctx.setLineDash([8,7]); ctx.strokeStyle="rgba(255,255,255,.72)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(wallX-130,hitY); ctx.lineTo(wallX+105,hitY); ctx.stroke(); ctx.setLineDash([]);
    coreArrow(ctx,inX,inY,wallX,hitY,"#22d3ee",4); coreArrow(ctx,wallX,hitY,outX,outY,"#ff5cab",4);
    if(vizState.running){ const u=(time*.08)%1; coreDot(ctx,inX+(wallX-inX)*u,inY+(hitY-inY)*u,6,"#22d3ee"); coreDot(ctx,wallX+(outX-wallX)*u,hitY+(outY-hitY)*u,6,"#ff5cab"); }
    ctx.fillStyle="#e8f5ff"; ctx.font="bold 16px Sarabun"; ctx.textAlign="center"; ctx.fillText("θᵢ = θᵣ",wallX-95,hitY+58); ctx.fillText("เส้นฉาก",wallX+75,hitY-12);
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-100,210,76,"กฎการสะท้อน",`θᵢ = θᵣ = ${angle.toFixed(0)}°`,"วัดจากเส้นฉาก","#22d3ee");

  } else if(mode==="soundRefraction"){
    const dT=vNum("vizTempDiff",15), angle=vNum("vizAngle",25); vText("vizTempDiffLabel",dT.toFixed(0)+" °C"); vText("vizAngleLabel",angle.toFixed(0)+"°");
    panel=corePanel(ctx,w,h,"Sound Refraction (การหักเหของเสียง)"); cx=w/2; cy=panel.y+panel.h*.50;
    ctx.fillStyle="rgba(255,135,50,.10)"; ctx.fillRect(panel.x+20,panel.y+20,panel.w-40,panel.h/2-18);
    ctx.fillStyle="rgba(34,211,238,.10)"; ctx.fillRect(panel.x+20,cy,panel.w-40,panel.h/2-25);
    ctx.strokeStyle="rgba(255,255,255,.45)"; ctx.setLineDash([8,8]); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(panel.x+30,cy); ctx.lineTo(panel.x+panel.w-30,cy); ctx.stroke(); ctx.setLineDash([]);
    const sx=panel.x+115, sy=cy-115, bend=30+dT*3.0;
    drawSpeaker(ctx,sx,sy,.85);
    ctx.strokeStyle="#ff5cab"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(sx+58,sy+15); ctx.quadraticCurveTo(cx-90,cy-25,cx,cy); ctx.quadraticCurveTo(cx+95,cy+bend*.45,cx+260,cy+bend); ctx.stroke();
    coreArrow(ctx,cx+195,cy+bend-25,cx+260,cy+bend,"#ff5cab",4);
    if(vizState.running){ const u=(time*.06)%1; coreDot(ctx,sx+58+(cx+260-sx-58)*u,sy+15+(cy+bend-sy-15)*u,6,"#ff5cab"); }
    ctx.fillStyle="#e8f5ff"; ctx.font="bold 16px Sarabun"; ctx.textAlign="left"; ctx.fillText("อากาศอุ่น: v มากกว่า",cx+145,cy-95); ctx.fillText("อากาศเย็น: v น้อยกว่า",cx+145,cy+95);
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-100,250,76,"แนวคิดสำคัญ","เบนเข้าหาบริเวณที่ช้ากว่า",`ΔT = ${dT.toFixed(0)} °C`,"#ff5cab");

  } else if(mode==="soundDiffraction"){
    const slit=vNum("vizSlit",1), freq=vNum("vizFreq",600); vText("vizSlitLabel",slit.toFixed(1)+" λ"); vText("vizFreqLabel",freq.toFixed(0)+" Hz");
    panel=corePanel(ctx,w,h,"Sound Diffraction (การเลี้ยวเบนของเสียง)"); cx=w/2; cy=panel.y+panel.h*.52;
    const bx=cx-75, gap=lim(78*slit,34,190); drawSpeaker(ctx,panel.x+110,cy,.85);
    for(let i=0;i<8;i++){ const x=panel.x+160+i*38+((time*18)%38); ctx.strokeStyle=`rgba(34,211,238,${.78-i*.06})`; ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(x,cy-115); ctx.lineTo(x,cy+115); ctx.stroke(); }
    ctx.strokeStyle="rgba(255,255,255,.64)"; ctx.lineWidth=8; ctx.beginPath(); ctx.moveTo(bx,panel.y+45); ctx.lineTo(bx,cy-gap/2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx,cy+gap/2); ctx.lineTo(bx,panel.y+panel.h-45); ctx.stroke();
    const spread=slit<.8?1.35:slit<1.5?1.05:.72; coreArcs(ctx,bx,cy,10,32,"rgba(255,92,171,.88)",-spread,spread,(time*18)%32);
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-100,230,76,"เงื่อนไขเห็นชัด",`a = ${slit.toFixed(1)}λ`,"เมื่อ a ≈ λ เลี้ยวเบนเด่น","#ff5cab");

  } else if(mode==="soundInterference"){
    const sep=vNum("vizSeparation",.8), ph=vNum("vizPhaseDiff",0); vText("vizSeparationLabel",sep.toFixed(2)+" m"); vText("vizPhaseDiffLabel",ph.toFixed(0)+"°");
    panel=corePanel(ctx,w,h,"Sound Interference (การแทรกสอดของเสียง)"); cx=w/2; cy=panel.y+panel.h*.52;
    const sx=panel.x+150, s1=cy-78*sep, s2=cy+78*sep; drawSpeaker(ctx,sx,s1,.7); drawSpeaker(ctx,sx,s2,.7);
    coreArcs(ctx,sx,s1,11,31,"rgba(34,211,238,.78)",-1.2,1.2,(time*20)%31); coreArcs(ctx,sx,s2,11,31,"rgba(255,92,171,.72)",-1.2,1.2,(time*20+ph/8)%31);
    for(let i=0;i<9;i++){ const x=cx-20+i*45, y=cy+Math.sin(i*1.7+ph*Math.PI/180)*95; coreDot(ctx,x,y,4,i%2?"#ff5cab":"#22d3ee"); }
    coreMetricCard(ctx,cx+85,cy-112,300,82,"เงื่อนไขเฟสตรงกัน","ดัง: Δr = mλ","ค่อย: Δr = (m+1/2)λ","#22d3ee");

  } else if(mode==="superposition"){
    const f=vNum("vizFreq",440), A=vNum("vizAmp",.8), ph=vNum("vizPhaseDiff",0)*Math.PI/180; vText("vizFreqLabel",f.toFixed(0)+" Hz"); vText("vizAmpLabel",A.toFixed(2)); vText("vizPhaseDiffLabel",(ph*180/Math.PI).toFixed(0)+"°");
    panel=corePanel(ctx,w,h,"Superposition (การซ้อนทับของคลื่น)"); const x0=panel.x+80,x1=panel.x+panel.w-70,y1=panel.y+110,y2=panel.y+205,y3=panel.y+300, W=x1-x0;
    function plot(ybase, phase, col, amp=A*28){ const pts=[]; for(let i=0;i<=W;i+=4){ const x=x0+i; const y=ybase-Math.sin(i/70-time*3+phase)*amp; pts.push([x,y]); } coreWaveLine(ctx,pts,col,2.6); }
    plot(y1,0,"#22d3ee"); plot(y2,ph,"#ff5cab");
    const pts=[]; for(let i=0;i<=W;i+=4){ const y=y3-(Math.sin(i/70-time*3)+Math.sin(i/70-time*3+ph))*A*22; pts.push([x0+i,y]); } coreWaveLine(ctx,pts,"#fbbf24",3.3);
    ctx.fillStyle="#e8f5ff"; ctx.font="bold 15px Sarabun"; ctx.fillText("คลื่น 1",x0,y1-42); ctx.fillText("คลื่น 2",x0,y2-42); ctx.fillText("ผลรวม y = y₁ + y₂",x0,y3-45);

  } else if(mode==="beatsViz"){
    const f1=vNum("vizFreq",440), f2=vNum("vizFreq2",444), A=vNum("vizAmp",.9), fb=Math.abs(f2-f1); vText("vizFreqLabel",f1.toFixed(0)+" Hz"); vText("vizFreq2Label",f2.toFixed(0)+" Hz"); vText("vizAmpLabel",A.toFixed(2));
    panel=corePanel(ctx,w,h,"Beats (บีตส์)"); const x0=panel.x+80,x1=panel.x+panel.w-80,y=panel.y+panel.h*.52,W=x1-x0;
    const pts=[], envTop=[], envBot=[]; for(let i=0;i<=W;i+=3){ const x=x0+i, t=i/90-time*2.0, env=Math.cos((f2-f1)*i/1600)*A*65; pts.push([x,y-Math.sin(t*f1/90)*env]); envTop.push([x,y-Math.abs(env)]); envBot.push([x,y+Math.abs(env)]); }
    coreWaveLine(ctx,envTop,"rgba(251,191,36,.8)",2); coreWaveLine(ctx,envBot,"rgba(251,191,36,.8)",2); coreWaveLine(ctx,pts,"#22d3ee",2.4);
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,220,78,"ความถี่บีต",`f_b = ${fb.toFixed(0)} Hz`,"|f₂ - f₁|","#fbbf24");

  } else if(mode==="standingAir"){
    const n=Math.round(vNum("vizTubeMode",2)), typ=vSel("vizSubMode","open"); vText("vizTubeModeLabel",String(n)); vText("vizSubModeLabel",typ);
    panel=corePanel(ctx,w,h,"Standing Wave (คลื่นนิ่ง)"); const left=panel.x+105,right=panel.x+panel.w-105,y=panel.y+panel.h*.50,W=right-left;
    ctx.strokeStyle="rgba(255,255,255,.44)"; ctx.lineWidth=3; roundRect(ctx,left,y-48,W,96,16); ctx.stroke();
    const pts=[]; for(let i=0;i<=W;i+=4){ const x=left+i, u=i/W; let shape=typ==="closed"?Math.sin((2*n-1)*Math.PI*u/2):Math.sin(n*Math.PI*u); pts.push([x,y-shape*55*Math.sin(time*3)]); } coreWaveLine(ctx,pts,"#22d3ee",3.2);
    for(let k=0;k<=n;k++){ const x=left+(k/n)*W; coreDot(ctx,x,y,4,k%2?"#ff5cab":"#22d3ee"); }
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-100,230,76,"โหมดคลื่นนิ่ง",`${typ}, n=${n}`,"ปมและปฏิบัพสลับกัน","#22d3ee");

  } else if(mode==="resonanceViz" || mode==="resonanceAirHarmonics"){
    const n=Math.round(vNum("vizTubeMode",1)), L=vNum("vizLength",.8), typ=vSel("vizSubMode","closed"), f=vNum("vizFreq",440);
    vText("vizTubeModeLabel",String(n)); vText("vizLengthLabel",L.toFixed(2)+" m"); vText("vizSubModeLabel",typ); vText("vizFreqLabel",f.toFixed(0)+" Hz");
    panel=corePanel(ctx,w,h,mode==="resonanceViz"?"Resonance in Air Column":"Resonance Harmonic Modes"); const left=panel.x+100,right=panel.x+panel.w-100,y=panel.y+panel.h*.46,W=right-left;
    ctx.strokeStyle="rgba(255,255,255,.44)"; ctx.lineWidth=4; roundRect(ctx,left,y-42,W,84,14); ctx.stroke(); if(typ==="closed"){ ctx.fillStyle="rgba(255,255,255,.55)"; ctx.fillRect(left-8,y-44,10,88); }
    let modeN = n;
    if(mode==="resonanceViz"){
      if(typ==="closed"){
        const oddIndex = Math.max(1, Math.round((4*L*f/343 + 1)/2));
        modeN = oddIndex;
      }else{
        modeN = Math.max(1, Math.round(2*L*f/343));
      }
    }
    const fn = typ==="closed" ? ((2*modeN-1)*343/(4*L)) : (modeN*343/(2*L));
    const pts=[]; for(let i=0;i<=W;i+=4){ const u=i/W; const k=typ==="closed"?(2*modeN-1)*Math.PI/2:modeN*Math.PI; pts.push([left+i,y-Math.sin(k*u)*54*Math.sin(time*3)]); } coreWaveLine(ctx,pts,"#22d3ee",3.2);
    const response=mode==="resonanceViz"?Math.exp(-Math.pow((f-fn)/(Math.max(18,fn*.10)),2)):.85; coreBar(ctx,panel.x+330,panel.y+panel.h-75,360,14,response,"#fbbf24");
    const formula = typ==="closed" ? "fₙ=(2n−1)v/4L" : "fₙ=nv/2L";
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,280,80,"โหมดในท่อ",`${formula}` ,`n=${modeN}, fₙ≈${fn.toFixed(0)} Hz`,"#fbbf24");

  } else if(mode==="dopplerViz"){
    const vs=vNum("vizSpeed",.35), f=vNum("vizFreq",520); vText("vizSpeedLabel",vs.toFixed(2)+" v"); vText("vizFreqLabel",f.toFixed(0)+" Hz");
    panel=corePanel(ctx,w,h,"Doppler Effect (ปรากฏการณ์ดอปเพลอร์)"); cx=panel.x+panel.w*.48; cy=panel.y+panel.h*.52; const sx=cx+Math.sin(time*.8)*55;
    ctx.fillStyle="#e8f5ff"; ctx.font="bold 34px Sarabun"; ctx.textAlign="center"; ctx.fillText("🚗",sx,cy+10); coreArrow(ctx,sx-90,cy,sx-20,cy,"#22d3ee",3);
    for(let i=1;i<13;i++){ const rr=i*(34-vs*14)+(time*18%30); ctx.strokeStyle=`rgba(34,211,238,${lim(.75-i*.045,.16,.75)})`; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(sx+vs*rr*.65,cy,rr,rr*.7,0,0,Math.PI*2); ctx.stroke(); }
    const fFront = f/(1-Math.min(vs,.95));
    const fBack = f/(1+Math.min(vs,.95));
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,285,80,"Doppler: ผู้สังเกตนิ่ง",`หน้า ≈ ${fFront.toFixed(0)} Hz` ,`หลัง ≈ ${fBack.toFixed(0)} Hz; f′=f v/(v∓vₛ)`,"#22d3ee");

  } else if(mode==="shockWave"){
    const M=vNum("vizMach",1.5), v=vNum("vizSpeed",343); vText("vizMachLabel",M.toFixed(2)); vText("vizSpeedLabel",v.toFixed(0)+" m/s");
    panel=corePanel(ctx,w,h,"Shock Wave / Sonic Boom"); cx=w/2; cy=panel.y+panel.h*.52; const theta=Math.asin(1/Math.max(M,1.01)), sx=cx+105;
    coreArrow(ctx,panel.x+110,cy,sx,cy,"#22d3ee",3); ctx.fillStyle="#e8f5ff"; ctx.font="bold 34px Sarabun"; ctx.textAlign="center"; ctx.fillText("✈️",sx,cy+10);
    ctx.strokeStyle="#c084fc"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(sx,cy); ctx.lineTo(sx-360,cy-Math.tan(theta)*360); ctx.stroke(); ctx.beginPath(); ctx.moveTo(sx,cy); ctx.lineTo(sx-360,cy+Math.tan(theta)*360); ctx.stroke();
    coreArcs(ctx,sx,cy,9,30,"rgba(34,211,238,.42)",2.55,3.75,(time*18)%30);
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,245,80,"กรวยมัค",`sin θ = 1/M`,"เกิดเมื่อ M > 1","#c084fc");

  } else if(mode==="soundIntensity" || mode==="soundIntensityLevel"){
    const r=vNum("vizDistance",5), P=vNum("vizPower",1), logI=vNum("vizIntensity",-5); vText("vizDistanceLabel",r.toFixed(1)+" m"); vText("vizPowerLabel",P.toFixed(1)+" W"); vText("vizIntensityLabel",`1.0×10^${logI.toFixed(1)} W/m²`);
    const I=mode==="soundIntensityLevel"?Math.pow(10,logI):P/(4*Math.PI*r*r), beta=10*Math.log10(I/1e-12);
    panel=corePanel(ctx,w,h,mode==="soundIntensity"?"Sound Intensity (ความเข้มเสียง)":"Sound Intensity Level (ระดับความเข้มเสียง)"); cy=panel.y+panel.h*.48; const sx=panel.x+130; drawSpeaker(ctx,sx,cy,.9); coreArcs(ctx,sx,cy,10,42,"rgba(34,211,238,.65)",-.9,.9,(time*18)%42);
    const mx=sx+lim(r*38,80,panel.w-185); coreDot(ctx,mx,cy,7,"#ff5cab"); ctx.strokeStyle="rgba(255,92,171,.5)"; ctx.setLineDash([7,6]); ctx.beginPath(); ctx.moveTo(sx+30,cy+58); ctx.lineTo(mx,cy+58); ctx.stroke(); ctx.setLineDash([]);
    const title=mode==="soundIntensity"?"I = P/(4πr²)":`β ≈ ${beta.toFixed(0)} dB`; coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,260,80,mode==="soundIntensity"?"ความเข้มเสียง":"ระดับความเข้มเสียง",title,mode==="soundIntensity"?"ลดลงตาม 1/r²":"β = 10 log₁₀(I/I₀)","#ff5cab");
    coreBar(ctx,panel.x+340,panel.y+panel.h-70,380,14,lim(beta/130,0,1),"#fbbf24");

  } else if(mode==="soundLevelHearing"){
    const f=vNum("vizFreq",1000), level=vNum("vizLevel",60); vText("vizFreqLabel",f>=1000?(f/1000).toFixed(1)+" kHz":f.toFixed(0)+" Hz"); vText("vizLevelLabel",level.toFixed(0)+" dB");
    panel=corePanel(ctx,w,h,"Sound Level, Frequency and Hearing"); const x0=panel.x+90,y0=panel.y+panel.h-70,x1=panel.x+panel.w-80,y1=panel.y+65;
    ctx.strokeStyle="#22d3ee"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x0,y0); ctx.lineTo(x0,y1); ctx.lineTo(x1,y1); ctx.stroke();
    ctx.fillStyle="rgba(34,211,238,.16)"; ctx.beginPath(); ctx.moveTo(x0+55,y0-20); ctx.bezierCurveTo(x0+125,y1+75,x1-160,y1+55,x1-65,y0-60); ctx.lineTo(x1-65,y1+35); ctx.bezierCurveTo(x1-180,y1+20,x0+150,y1+20,x0+55,y1+60); ctx.closePath(); ctx.fill();
    const lx=(Math.log10(lim(f,20,20000))-Math.log10(20))/(Math.log10(20000)-Math.log10(20)), px=x0+lx*(x1-x0), py=y0-(level/130)*(y0-y1); coreDot(ctx,px,py,8,"#ff5cab");
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,310,80,"การได้ยินมนุษย์","20 Hz – 20 kHz","ไวมากประมาณ 2–5 kHz","#22d3ee");

  } else if(mode==="harmonicsViz"){
    const f0=vNum("vizFreq",220), mix=vNum("vizHarmonicMix",.55), inst=vSel("vizInstrument","violin"); vText("vizFreqLabel",f0.toFixed(0)+" Hz"); vText("vizHarmonicMixLabel",mix.toFixed(2)); vText("vizInstrumentLabel",inst);
    panel=corePanel(ctx,w,h,"Harmonics and Timbre (ฮาร์มอนิกและคุณภาพเสียง)"); const x0=panel.x+80,x1=panel.x+panel.w-80,y=panel.y+142,W=x1-x0;
    const harmonics=inst==="sine"?[1,0,0,0]:inst==="clarinet"?[1,0,.55*mix,0,.32*mix]:inst==="square"?[1,0,.65*mix,0,.38*mix]:[1,.55*mix,.38*mix,.25*mix,.16*mix];
    const pts=[]; for(let i=0;i<=W;i+=3){ let yy=0; harmonics.forEach((a,k)=>{ if(a) yy+=a*Math.sin((i/75-time*2)*(k+1)); }); pts.push([x0+i,y-yy*28]); } coreWaveLine(ctx,pts,"#22d3ee",2.6);
    harmonics.forEach((a,k)=>{ const bx=x0+k*72, bh=a*110; ctx.fillStyle=k===0?"#22d3ee":"#ff5cab"; roundRect(ctx,bx,panel.y+panel.h-80-bh,34,bh,7); ctx.fill(); ctx.fillStyle="#e8f5ff"; ctx.font="12px Sarabun"; ctx.textAlign="center"; ctx.fillText(String(k+1),bx+17,panel.y+panel.h-55); });
    coreMetricCard(ctx,panel.x+38,panel.y+panel.h-104,245,80,"คุณภาพเสียง",inst,"ขึ้นกับ harmonic spectrum","#22d3ee");

  } else if(mode==="noisePollution"){
    const source=vNum("vizSourceLevel",85), prot=vNum("vizProtection",15), after=lim(source-prot,0,140); vText("vizSourceLevelLabel",source.toFixed(0)+" dB"); vText("vizProtectionLabel",prot.toFixed(0)+" dB");
    panel=corePanel(ctx,w,h,"Noise Pollution and Protection"); const base=panel.y+panel.h-88,left=panel.x+90,right=panel.x+panel.w-90;
    [50,70,85,100,115].forEach((lv,i)=>{ const x=left+i*(right-left)/4,bh=(lv-35)*2.2; ctx.fillStyle=lv>=90?"rgba(255,77,109,.75)":lv>=75?"rgba(251,191,36,.72)":"rgba(34,211,238,.65)"; roundRect(ctx,x-25,base-bh,50,bh,10); ctx.fill(); ctx.fillStyle="#e8f5ff"; ctx.font="13px Sarabun"; ctx.textAlign="center"; ctx.fillText(lv+" dB",x,base+22); });
    coreMetricCard(ctx,panel.x+38,panel.y+42,320,80,"ค่าจำลองเพื่อการเรียนรู้",`${source.toFixed(0)} dB → ${after.toFixed(0)} dB`,`ลดลง ${prot.toFixed(0)} dB จากการป้องกัน`,"#fbbf24");

  } else if(mode==="applicationsSound"){
    const cat=vSel("vizAppCategory","all"); vText("vizAppLabel",cat); panel=corePanel(ctx,w,h,"Applications of Sound");
    const cards=[["medical","อัลตราซาวด์","สร้างภาพทางการแพทย์","🏥"],["sonar","โซนาร์","ตรวจวัตถุใต้น้ำ","🌊"],["echo","Echolocation","สัตว์ใช้เสียงสะท้อน","🦇"],["industry","อุตสาหกรรม","ตรวจรอยร้าว/ความหนา","🏭"]];
    cards.forEach((card,i)=>{ if(cat!=="all" && card[0]!==cat) return; const j=cat==="all"?i:0, x=panel.x+70+(j%2)*(panel.w/2), y=panel.y+72+Math.floor(j/2)*118; ctx.fillStyle="rgba(7,18,38,.82)"; ctx.strokeStyle="rgba(34,211,238,.45)"; roundRect(ctx,x,y,panel.w/2-115,86,16); ctx.fill(); ctx.stroke(); ctx.fillStyle="#e8f5ff"; ctx.font="bold 28px Sarabun"; ctx.fillText(card[3],x+18,y+45); ctx.fillStyle="#22d3ee"; ctx.font="bold 17px Sarabun"; ctx.fillText(card[1],x+60,y+32); ctx.fillStyle="#e8f5ff"; ctx.font="14px Sarabun"; ctx.fillText(card[2],x+60,y+60); });
  }
}


function drawVisualizer(){
  const c=$("visualizerCanvas"); if(!c) return;
  const ctx=c.getContext("2d");
  const p=getVizParams();
  vizGrid(ctx,c);
  const W=c.width,H=c.height, mid=H/2;
  const phase=vizState.t*0.055*p.speed;
  const mode=vizState.mode;

  // v5.40: force Longitudinal Wave to use the custom final renderer before the old branch.
  if(mode==="longitudinal"){
    drawLongitudinalFinal(ctx,c,p,W,H);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(mode==="pressure"){
    drawPressureWaveFinal(ctx,c,p,W,H);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(mode==="speedSound"){
    drawSpeedOfSoundTeachingFinal(ctx,c,p,W,H);
    if(vizState.running){
      const ps = getSpeedSoundParams();
      const displaySlowFactor = 40;
      const elapsed = (vizState.t * 0.016 * ps.timeScale) / displaySlowFactor;
      const resetAt = Math.max(ps.dt + 0.45, 0.85);
      vizState.t = elapsed >= resetAt ? 0 : vizState.t + 1;
    }
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(soundTopicModes.has(mode)){
    drawSoundTopicPlaceholder(ctx,c,p,W,H,mode);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(rebuiltTopicModes.has(mode)){
    drawRebuiltTopic(ctx,c,p,W,H,mode);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(mode==="displacementPressure"){

    drawDisplacementPressureFinal(ctx,c,p,W,H);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }


  ctx.fillStyle="#cfe9ff"; ctx.font="20px Sarabun";
  ctx.fillText(modeLabel(mode),24,34);
  drawVizAxis(ctx,c,mode);
  drawVizScale(ctx,c,mode);
  if(c.dataset.vizMode!=="longitudinal") drawVizLegend(ctx,c);

  if(mode==="longitudinal" || mode==="pressure"){
    const trackedIndex = 30;
    const rows = mode==="longitudinal" ? [mid] : [mid-50, mid+50];
    for(const yBase of rows){
      for(let i=0;i<70;i++){
        const x0=70+i*(W-140)/69;
        const disp=Math.sin((i/69)*Math.PI*8-phase)*p.A*22;
        const x=x0+disp;
        const density=(Math.sin((i/69)*Math.PI*8-phase)+1)/2;
        const isTracked = i===trackedIndex;
        ctx.fillStyle=isTracked ? "#ff4d6d" : (mode==="pressure"?`rgba(34,211,238,${0.25+0.65*density})`:"#22d3ee");
        ctx.beginPath(); ctx.arc(x,yBase,isTracked?8:(mode==="pressure"?5+7*density:6),0,Math.PI*2); ctx.fill();
        if(isTracked){
          ctx.strokeStyle="#ffffff"; ctx.lineWidth=2;
          ctx.beginPath(); ctx.arc(x,yBase,(mode==="pressure"?5+7*density:6)+2,0,Math.PI*2); ctx.stroke();
        }
        if(mode==="longitudinal"){
          ctx.strokeStyle="rgba(255,255,255,.14)";
          ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(x0,yBase-35); ctx.lineTo(x0,yBase+35); ctx.stroke();
          if(isTracked){
            drawTrackedVertical(ctx,x0,yBase-42,yBase+42);
            drawTrackedParticle(ctx,x,yBase,"");
            drawLongitudinalAnnotations(ctx,x0,x,yBase);
          }
        }
        if(mode==="pressure" && isTracked && yBase===mid-50){
          drawTrackedParticle(ctx,x,yBase,"");
        }
      }
    }
    if(mode==="pressure"){
      for(let x=70;x<W-70;x+=4){
        const val=(Math.sin((x-70)/(W-140)*Math.PI*8-phase)+1)/2;
        ctx.fillStyle=`rgba(34,211,238,${0.05+0.55*val})`;
        ctx.fillRect(x,mid-140,4,280);
      }
    }
  }

  if(soundTopicModes.has(mode)){
    drawSoundTopicPlaceholder(ctx,c,p,W,H,mode);
    if(vizState.running) vizState.t += 1;
    vizState.raf=requestAnimationFrame(drawVisualizer);
    return;
  }

  if(mode==="displacementPressure"){
    const pts1=[], pts2=[];
    for(let x=60;x<W-60;x++){
      const u=(x-60)/(W-120)*Math.PI*8-phase;
      pts1.push([x,150-Math.sin(u)*p.A*55]);
      pts2.push([x,360-Math.cos(u)*p.A*55]);
    }
    const trackedIdx = Math.floor(pts1.length*0.42);
    ctx.fillStyle="#9fb3c8"; ctx.fillText("Displacement",70,85); ctx.fillText("Pressure",70,295);
    drawWaveLine(ctx,pts1,"#22d3ee",3); drawWaveLine(ctx,pts2,"#fbbf24",3);
    drawTrackedVertical(ctx,pts1[trackedIdx][0],105,415);
    drawTrackedParticle(ctx,pts1[trackedIdx][0],pts1[trackedIdx][1],"observation point");
    drawTrackedParticle(ctx,pts2[trackedIdx][0],pts2[trackedIdx][1],"same x-position");
  }

  if(mode==="transverseCompare"){
    const trackedIndex = 22;
    for(let i=0;i<60;i++){
      const x0=70+i*(W-140)/59;
      const disp=Math.sin((i/59)*Math.PI*8-phase)*p.A*20;
      const isTracked = i===trackedIndex;
      ctx.fillStyle=isTracked ? "#ff4d6d" : "#22d3ee";
      ctx.beginPath(); ctx.arc(x0+disp,160,isTracked?7:5,0,Math.PI*2); ctx.fill();
      if(isTracked){
        ctx.strokeStyle="#ffffff"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(x0+disp,160,9,0,Math.PI*2); ctx.stroke();
        drawTrackedParticle(ctx,x0+disp,160,"tracked particle");
      }
    }
    const pts=[];
    for(let x=60;x<W-60;x++){
      const y=365-Math.sin((x-60)/(W-120)*Math.PI*8-phase)*p.A*60;
      pts.push([x,y]);
    }
    const trackedCurveIdx = Math.floor(pts.length*0.42);
    ctx.fillStyle="#9fb3c8"; ctx.fillText("Longitudinal representation",70,95); ctx.fillText("Transverse representation",70,295);
    drawWaveLine(ctx,pts,"#fbbf24",3);
    drawTrackedParticle(ctx,pts[trackedCurveIdx][0],pts[trackedCurveIdx][1],"same wave position");
  }

  if(mode==="superposition" || mode==="beatsViz"){
    const ptsA=[], ptsB=[], ptsSum=[];
    const f2 = mode==="beatsViz" ? p.f+8 : p.f*1.35;
    for(let x=60;x<W-60;x++){
      const xx=(x-60)/(W-120);
      const y1=Math.sin(xx*Math.PI*8-phase)*p.A*45;
      const y2=Math.sin(xx*Math.PI*8*(f2/p.f)-phase*1.07)*p.A*45;
      ptsA.push([x,135-y1]); ptsB.push([x,250-y2]); ptsSum.push([x,385-(y1+y2)*0.72]);
    }
    const trackedIdx = Math.floor(ptsA.length*0.36);
    drawWaveLine(ctx,ptsA,"#22d3ee",2); drawWaveLine(ctx,ptsB,"#a855f7",2); drawWaveLine(ctx,ptsSum,"#fbbf24",4);
    ctx.fillStyle="#9fb3c8"; ctx.fillText("Wave A",70,80); ctx.fillText("Wave B",70,195); ctx.fillText("Result",70,330);
    drawTrackedVertical(ctx,ptsA[trackedIdx][0],85,405);
    drawTrackedParticle(ctx,ptsA[trackedIdx][0],ptsA[trackedIdx][1],"wave A point");
    drawTrackedParticle(ctx,ptsB[trackedIdx][0],ptsB[trackedIdx][1],"wave B point");
    drawTrackedParticle(ctx,ptsSum[trackedIdx][0],ptsSum[trackedIdx][1],"result point");
  }

  if(mode==="standingAir"){
    const closed=p.sub==="closed";
    const tubeX=90,tubeY=110,tubeW=W-180,tubeH=230;
    const trackedIndex = 10;
    ctx.strokeStyle="#cfe9ff"; ctx.lineWidth=5;
    ctx.strokeRect(tubeX,tubeY,tubeW,tubeH);
    if(closed){ctx.fillStyle="#cfe9ff";ctx.fillRect(tubeX-8,tubeY-5,12,tubeH+10);}
    const pts=[];
    for(let x=0;x<=tubeW;x++){
      const xx=x/tubeW;
      const shape=closed?Math.sin(xx*Math.PI/2):Math.sin(xx*Math.PI);
      const y=tubeY+tubeH/2-Math.sin(phase)*shape*p.A*95;
      pts.push([tubeX+x,y]);
    }
    drawWaveLine(ctx,pts,"#22d3ee",4);
    for(let i=0;i<18;i++){
      const x=tubeX+20+i*(tubeW-40)/17;
      const xx=(x-tubeX)/tubeW;
      const shape=closed?Math.sin(xx*Math.PI/2):Math.sin(xx*Math.PI);
      const y = tubeY+tubeH/2-Math.sin(phase)*shape*p.A*70;
      const isTracked = i===trackedIndex;
      ctx.fillStyle=isTracked ? "#ff4d6d" : "#fbbf24";
      ctx.beginPath();ctx.arc(x,y,isTracked?7:5,0,Math.PI*2);ctx.fill();
      if(isTracked){
        ctx.strokeStyle="#ffffff"; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(x,y,9,0,Math.PI*2); ctx.stroke();
        drawTrackedParticle(ctx,x,y,"tracked air particle");
      }
    }
  }

  if(mode==="resonanceViz"){
    const f0=440, width=55;
    const pts=[];
    for(let x=80;x<W-80;x++){
      const freq=100+(x-80)/(W-160)*900;
      const amp=Math.exp(-Math.pow((freq-f0)/width,2));
      pts.push([x,H-80-amp*p.A*320]);
    }
    drawWaveLine(ctx,pts,"#34d399",4);
    ctx.strokeStyle="#fbbf24";ctx.lineWidth=2;const rx=80+(f0-100)/900*(W-160);ctx.beginPath();ctx.moveTo(rx,80);ctx.lineTo(rx,H-70);ctx.stroke();
    const peakY = H-80-1*p.A*320;
    drawTrackedParticle(ctx,rx,peakY,"resonance peak");
  }

  if(mode==="harmonicsViz"){
    const type=p.sub;
    const bars = type==="square" ? [1,0,0.33,0,0.2,0,0.14] : type==="sawtooth" ? [1,0.5,0.33,0.25,0.2,0.16,0.14] : [1,0,0,0,0,0,0];
    const baseX=140, baseY=H-90, gap=120;
    bars.forEach((a,i)=>{
      const h=a*330*p.A;
      ctx.fillStyle=i===0?"#ff4d6d":"#a855f7";
      ctx.fillRect(baseX+i*gap,baseY-h,55,h);
      if(i===0){
        ctx.strokeStyle="#ffffff"; ctx.lineWidth=2;
        ctx.strokeRect(baseX+i*gap-2,baseY-h-2,59,h+4);
        drawTrackedParticle(ctx,baseX+i*gap+27,baseY-h,"fundamental");
      }
      ctx.fillStyle="#cfe9ff";ctx.font="16px Sarabun";ctx.fillText(`${i+1}f`,baseX+i*gap+10,baseY+24);
    });
  }

  if(mode==="dopplerViz"){
    const sx=360+Math.sin(phase*0.18)*220, sy=mid;
    const ox = W-160, oy = mid-40;
    ctx.fillStyle="#fbbf24";ctx.beginPath();ctx.arc(sx,sy,14,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle="rgba(34,211,238,.65)";ctx.lineWidth=3;
    for(let r=40;r<520;r+=42){
      ctx.beginPath();ctx.arc(sx-r*0.18,sy,r,0,Math.PI*2);ctx.stroke();
    }
    ctx.fillStyle="#cfe9ff";ctx.font="18px Sarabun";ctx.fillText("source",sx+20,sy-18);
    drawTrackedParticle(ctx,ox,oy,"observer point");
  }

  if(vizState.running) vizState.t += 1;
  vizState.raf=requestAnimationFrame(drawVisualizer);
}
function modeLabel(mode){
  return {
    longitudinal:"Longitudinal Wave (คลื่นตามยาว)",
    pressure:"Pressure Variation",
    displacementPressure:"Displacement + Pressure",
    transverseCompare:"Longitudinal / Transverse",
    superposition:"Superposition",
    beatsViz:"Beats",
    standingAir:"Standing Wave in Air Column",
    resonanceViz:"Resonance",
    harmonicsViz:"Harmonics / Timbre",
    dopplerViz:"Doppler"
  }[mode] || mode;
}
function updateVizPlayerButtons(trigger){
  const play=$("vizPlayBtn"), pause=$("vizPauseBtn"), reset=$("vizResetBtn");
  if(play) play.classList.toggle("isActive", !!vizState.running);
  if(pause) pause.classList.toggle("isActive", !vizState.running);
  if(reset){
    reset.classList.remove("isPressed");
    if(trigger==="reset"){
      void reset.offsetWidth;
      reset.classList.add("isPressed");
      setTimeout(()=>reset.classList.remove("isPressed"), 420);
    }
  }
}

function initVisualizer(){
  if(!$("visualizerCanvas")) return;
  const activeVizSection=document.querySelector(".visualizerSinglePage[data-viz-mode]");
  if(activeVizSection?.dataset?.vizMode){ vizState.mode=activeVizSection.dataset.vizMode; }
  resizeVisualizerCanvas();
  document.querySelectorAll("[data-viz]").forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll("[data-viz]").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      vizState.mode=btn.dataset.viz;
    };
  });
  ["vizFreq","vizAmp","vizSpeed","vizTimeSpeed","vizPhase","vizPhaseDiff","vizSubMode","vizDistance","vizTemp","vizAngle","vizTempDiff","vizSlit","vizSeparation","vizTubeMode","vizLength","vizMach","vizPower","vizIntensity","vizLevel","vizSourceLevel","vizProtection","vizAppCategory"].forEach(id=>{
    const el=$(id);
    if(!el) return;
    const handler=()=>{ getVizParams(); if(typeof drawVisualizer === "function") drawVisualizer(); };
    el.addEventListener("input", handler);
    el.addEventListener("change", handler);
  });
  if($("vizPlayBtn")) $("vizPlayBtn").onclick=()=>{vizState.running=true;updateVizPlayerButtons("play");drawVisualizer();};
  if($("vizPauseBtn")) $("vizPauseBtn").onclick=()=>{vizState.running=false;updateVizPlayerButtons("pause");drawVisualizer();};
  if($("vizResetBtn")) $("vizResetBtn").onclick=()=>{vizState.t=0;vizState.running=false;updateVizPlayerButtons("reset");drawVisualizer();};
  if($("vizExportBtn")) $("vizExportBtn").onclick=()=>{
    const c=$("visualizerCanvas");
    const a=document.createElement("a");
    a.href=c.toDataURL("image/png");
    a.download=makeTopicFileName("Image", "png");
    a.click();
  };
  if(vizState.raf) cancelAnimationFrame(vizState.raf);
  updateVizPlayerButtons();
  drawVisualizer();
}

function init(){fillBrowserInfo();initVisualizer();initLocalExportCards();if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}if(!$("startMic")) return;Object.entries(ctxs).forEach(([n,ctx])=>drawGrid(ctx,canvases[n]));drawBeat();drawResonance();renderColumnToggles();readConfig();loadSettings();renderLog();$("startMic").onclick=startMic;$("stopMic").onclick=stopMic;$("captureBtn").onclick=capture;$("downloadBtn").onclick=downloadCsv;$("downloadExcelBtn").onclick=downloadExcel;if($("captureCalBtn"))$("captureCalBtn").onclick=captureCalibration;if($("downloadCalBtn"))$("downloadCalBtn").onclick=downloadCalibrationCsv;if($("applyDbCalBtn"))$("applyDbCalBtn").onclick=applyDbCalibration;if($("playCalTone"))$("playCalTone").onclick=()=>{$("toneFreq").value=440;playTone();};if($("stopCalTone"))$("stopCalTone").onclick=stopTone;$("clearBtn").onclick=()=>{logs=[];renderLog();};$("autoLogBtn").onclick=toggleAutoLog;$("preset").onchange=()=>{applyPreset();};if($("userMode")) $("userMode").onchange=applyMode;$("freezeBtn").onclick=()=>{frozen=!frozen;$("freezeBtn").textContent=frozen?"Unfreeze Graph":"Freeze Graph";};$("resetPeakBtn").onclick=()=>{peakHold=[];};$("saveGraphsBtn").onclick=saveGraphs;$("saveSettingsBtn").onclick=saveSettings;$("resetSettingsBtn").onclick=resetSettings;$("configLinkBtn").onclick=copyConfig;$("playTone").onclick=playTone;$("stopTone").onclick=stopTone;$("playNoise").onclick=playNoise;$("stopNoise").onclick=stopNoise;$("playBeat").onclick=playBeat;$("stopBeat").onclick=stopBeat;["beatF1","beatF2","beatVol"].forEach(id=>$(id).addEventListener("input",()=>{if(beatOsc1)beatOsc1.frequency.value=Number($("beatF1").value||440);if(beatOsc2)beatOsc2.frequency.value=Number($("beatF2").value||444);if(beatGain)beatGain.gain.value=Number($("beatVol").value||.06);drawBeat();}));["resV","resL","resMode"].forEach(id=>$(id).addEventListener("input",drawResonance));["toneFreq","toneVol","toneType"].forEach(id=>$(id).addEventListener("input",()=>{if(toneOsc)toneOsc.frequency.value=Number($("toneFreq").value||440);if(toneGain)toneGain.gain.value=Number($("toneVol").value||.06);if(toneOsc)toneOsc.type=$("toneType").value;}));$("noiseVol").addEventListener("input",()=>{if(noiseGain)noiseGain.gain.value=Number($("noiseVol").value||.03);});if("serviceWorker"in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}}
document.addEventListener("DOMContentLoaded",init);


/* v5.10 local export per experiment page */
const localPageLogs = {};
function getActiveTopicTitle(){
  const activeTitle = document.querySelector("section.activeDetail h2")?.textContent?.trim();
  if(activeTitle) return activeTitle;
  const brandTitle = document.querySelector(".detailNav .brand span")?.textContent?.trim();
  if(brandTitle) return brandTitle;
  const card = document.querySelector(".localExportCard[data-export-name]");
  if(card?.dataset?.exportName) return card.dataset.exportName;
  return document.title || "MelodyLab";
}
function safeFileNamePart(text){
  return String(text || "MelodyLab")
    .normalize("NFC")
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[()\[\]{}]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 90) || "MelodyLab";
}
function fileTimestamp(){
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}
function makeTopicFileName(kind, ext){
  const topic = safeFileNamePart(getActiveTopicTitle());
  const suffix = kind ? "_" + safeFileNamePart(kind) : "";
  return `${topic}${suffix}_${fileTimestamp()}.${ext}`;
}
function getActiveExperimentName(){
  return getActiveTopicTitle();
}
function getLocalPageSnapshot(){
  const page = getActiveExperimentName();
  const now = new Date().toLocaleString("th-TH");
  const row = {time: now, page};

  // Visualizer values / current parameter settings
  if($("vizFreq")) row.parameter_frequency_hz = Number($("vizFreq").value || 0);
  if($("vizAmp")) row.parameter_amplitude_A = Number($("vizAmp").value || 0);
  if($("vizSpeed")) row.parameter_wave_speed_m_s = Number($("vizSpeed").value || 0);
  if($("vizTimeSpeed")) row.parameter_time_speed_x = Number($("vizTimeSpeed").value || 0);
  if($("vizPhase")) row.parameter_phase_deg = Number($("vizPhase").value || 0);
  if($("vizPhaseDiff")) row.parameter_phase_difference_deg = Number($("vizPhaseDiff").value || 0);
  if($("vizSubMode")) row.parameter_mode = $("vizSubMode").value || "";
  if($("vizDistance")) { row.parameter_distance_m = Number($("vizDistance").value || 0); row.parameter_path_length_s_m = Number($("vizDistance").value || 0); }
  if($("vizTemp")) row.parameter_temperature_c = Number($("vizTemp").value || 0);
  if($("vizAngle")) row.parameter_angle_deg = Number($("vizAngle").value || 0);
  if($("vizTempDiff")) row.parameter_temperature_difference_c = Number($("vizTempDiff").value || 0);
  if($("vizSlit")) row.parameter_slit_width_lambda = Number($("vizSlit").value || 0);
  if($("vizSeparation")) row.parameter_source_separation_m = Number($("vizSeparation").value || 0);
  if($("vizTubeMode")) row.parameter_tube_mode_n = Number($("vizTubeMode").value || 0);
  if($("vizLength")) row.parameter_length_m = Number($("vizLength").value || 0);
  if($("vizMach")) row.parameter_mach_number = Number($("vizMach").value || 0);
  if($("vizPower")) row.parameter_sound_power_w = Number($("vizPower").value || 0);
  if($("vizIntensity")) row.parameter_log_intensity = Number($("vizIntensity").value || 0);
  if($("vizLevel")) row.parameter_sound_level_db = Number($("vizLevel").value || 0);
  if($("vizSourceLevel")) row.parameter_source_level_db = Number($("vizSourceLevel").value || 0);
  if($("vizProtection")) row.parameter_protection_db = Number($("vizProtection").value || 0);
  if($("vizFreq2")) row.parameter_frequency_2_hz = Number($("vizFreq2").value || 0);
  if($("vizHarmonicMix")) row.parameter_harmonic_mix = Number($("vizHarmonicMix").value || 0);
  if($("vizInstrument")) row.parameter_instrument = $("vizInstrument").value || "";
  if($("vizAppCategory")) row.parameter_application_category = $("vizAppCategory").value || "";

  if($("vizFreqLabel")) row.frequency_display = $("vizFreqLabel").textContent || "";
  if($("vizAmpLabel")) row.amplitude_display = $("vizAmpLabel").textContent || "";
  if($("vizSpeedLabel")) row.wave_speed_display = $("vizSpeedLabel").textContent || "";
  if($("vizDistanceLabel")) row.distance_display = $("vizDistanceLabel").textContent || "";
  if($("vizTempLabel")) row.temperature_display = $("vizTempLabel").textContent || "";
  if($("vizSoundSpeedLabel")) row.sound_speed_display = $("vizSoundSpeedLabel").textContent || "";
  if($("vizTravelTimeLabel")) row.travel_time_display = $("vizTravelTimeLabel").textContent || "";
  if($("vizTimeLabel")) row.time_speed_display = $("vizTimeLabel").textContent || "";
  if($("vizPhaseLabel")) row.phase_display = $("vizPhaseLabel").textContent || "";
  if($("vizPhaseDiffLabel")) row.phase_difference_display = $("vizPhaseDiffLabel").textContent || "";
  const freqVal = Number($("vizFreq")?.value || 0);
  const speedVal = Number($("vizSpeed")?.value || 0);
  if(freqVal > 0 && speedVal > 0) row.parameter_wavelength_m = +(speedVal / freqVal).toFixed(4);

  // Legacy Visualizer outputs (if present)
  if($("vizFreqOut")) row.frequency = $("vizFreqOut").textContent || "";
  if($("vizAmpOut")) row.amplitude = $("vizAmpOut").textContent || "";
  if($("vizSpeedOut")) row.wave_speed = $("vizSpeedOut").textContent || "";
  if($("vizLambdaOut")) row.wavelength = $("vizLambdaOut").textContent || "";

  // Analysis / measure readouts
  if($("mainFreqOut")) row.main_frequency = $("mainFreqOut").textContent || "";
  if($("fftOut")) row.fft_peak = $("fftOut").textContent || "";
  if($("autoOut")) row.autocorrelation = $("autoOut").textContent || "";
  if($("periodOut")) row.period = $("periodOut").textContent || "";
  if($("dbOut")) row.db = $("dbOut").textContent || "";
  if($("dbStatsOut")) row.db_stats = $("dbStatsOut").textContent || "";

  // Resonance
  if($("resOut")) row.fundamental_frequency = $("resOut").textContent || "";
  if($("harmonicsOut")) row.harmonics = $("harmonicsOut").textContent || "";

  // Spectrogram / canvas state
  if($("spectrogramCanvas")) row.graph = "spectrogram_canvas";
  if($("spectrumCanvas")) row.graph = row.graph ? row.graph + "; spectrum_canvas" : "spectrum_canvas";
  if($("historyCanvas")) row.graph = row.graph ? row.graph + "; frequency_history_canvas" : "frequency_history_canvas";

  // Generator
  if($("toneFreq")) row.tone_frequency_hz = $("toneFreq").value || "";
  if($("toneType")) row.waveform = $("toneType").value || "";
  if($("beatF1")) row.beat_f1_hz = $("beatF1").value || "";
  if($("beatF2")) row.beat_f2_hz = $("beatF2").value || "";
  if($("beatOut")) row.beat_frequency = $("beatOut").textContent || "";

  // Settings / labels
  if($("labelInput")) row.label = $("labelInput").value || "";
  if($("runInput")) row.run = $("runInput").value || "";
  if($("preset")) row.preset = $("preset").value || "";

  return row;
}
function renderLocalExport(){
  const page = getActiveExperimentName();
  const logs = localPageLogs[page] || [];
  document.querySelectorAll(".localExportCard").forEach(card=>{
    const head = card.querySelector(".localHead");
    const body = card.querySelector(".localBody");
    if(!head || !body) return;
    head.innerHTML = "";
    body.innerHTML = "";
    const keys = Array.from(new Set(logs.flatMap(r=>Object.keys(r))));
    keys.forEach(k=>{
      const th = document.createElement("th");
      th.textContent = k;
      head.appendChild(th);
    });
    logs.forEach(r=>{
      const tr = document.createElement("tr");
      keys.forEach(k=>{
        const td = document.createElement("td");
        td.textContent = r[k] ?? "";
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });
  });
}
function captureLocalPageData(){
  const page = getActiveExperimentName();
  localPageLogs[page] ??= [];
  localPageLogs[page].push(getLocalPageSnapshot());
  renderLocalExport();
}
function downloadLocalPageCsv(){
  const page = getActiveExperimentName();
  const logs = localPageLogs[page] || [];
  const keys = Array.from(new Set(logs.flatMap(r=>Object.keys(r))));
  if(!logs.length){
    alert("ยังไม่มีข้อมูลที่บันทึกในหน้านี้");
    return;
  }
  const csv = [keys, ...logs.map(r=>keys.map(k=>r[k] ?? ""))]
    .map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\ufeff"+csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = makeTopicFileName("Data", "csv");
  a.click();
  URL.revokeObjectURL(url);
}
function clearLocalPageData(){
  const page = getActiveExperimentName();
  localPageLogs[page] = [];
  renderLocalExport();
}
function initLocalExportCards(){
  document.querySelectorAll(".localCaptureBtn").forEach(btn=>btn.onclick=captureLocalPageData);
  document.querySelectorAll(".localDownloadBtn").forEach(btn=>btn.onclick=downloadLocalPageCsv);
  document.querySelectorAll(".localClearBtn").forEach(btn=>btn.onclick=clearLocalPageData);
  renderLocalExport();
}



/* v5.14: redraw after orientation change to keep display consistent */
function refreshAfterOrientationChange(){
  setTimeout(()=>{
    if(typeof resizeVisualizerCanvas === "function") resizeVisualizerCanvas();
    if(typeof drawVisualizer === "function") drawVisualizer();
    if(typeof drawBeat === "function") drawBeat();
    if(typeof drawResonance === "function") drawResonance();
    document.querySelectorAll("canvas").forEach(c=>{
      c.style.width = "100%";
    });
  }, 250);
}
window.addEventListener("orientationchange", refreshAfterOrientationChange);
window.addEventListener("resize", refreshAfterOrientationChange);



/* v5.21 resize visualizer canvas for portrait/landscape */
function resizeVisualizerCanvas(){
  const canvas = $("visualizerCanvas");
  if(!canvas) return;

  const container = canvas.parentElement;
  if(!container) return;

  const rect = container.getBoundingClientRect();
  const cssW = Math.max(280, Math.floor(rect.width - 4));
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const isLongitudinal = !!document.querySelector(".visualizerSinglePage[data-viz-mode='longitudinal']");
  const isDisplacementPressure = !!document.querySelector(".visualizerSinglePage[data-viz-mode='displacementPressure']");
  const isSpeedSound = !!document.querySelector(".visualizerSinglePage[data-viz-mode='speedSound']");
  const isSoundTopic = !!document.querySelector('.visualizerSinglePage.soundTopicPage');

  let cssH;
  if(isLongitudinal || isDisplacementPressure || isSpeedSound || isSoundTopic){
    // v5.88: allow more vertical room on phones so the graph can visibly fill the slot.
    const vh = Math.max(640, window.innerHeight || 800);
    cssH = isLandscape ? Math.round(Math.min(vh * 0.66, cssW * 0.58)) : Math.round(vh * 0.52);
    cssH = Math.max(isLandscape ? 280 : 430, Math.min(cssH, isLandscape ? 420 : 620));
  }else{
    cssH = isLandscape ? Math.round(cssW * 0.42) : Math.round(cssW * 0.54);
    cssH = Math.max(isLandscape ? 180 : 220, Math.min(cssH, isLandscape ? 235 : 320));
  }

  const dpr = Math.max(1, window.devicePixelRatio || 1);

  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);
}

window.addEventListener("load", ()=>{ if(typeof resizeVisualizerCanvas === "function") resizeVisualizerCanvas(); });
