/* Keeps the existing matching model, upgrades hierarchy and result storytelling. */
document.querySelector('.note').textContent='Built for Cal Poly builders';
document.querySelector('.hero .eyebrow').textContent='Built for Cal Poly builders';
document.querySelector('.hero .lede').textContent='Mustang Match helps Cal Poly students discover a project worth building and teammates who can help make it real.';
document.querySelector('#ideas .eyebrow').textContent='Your Project Matches';
document.querySelector('#ideas h2').textContent='Three projects that fit your next move.';
document.querySelector('#team .eyebrow').textContent='Meet Your Team';
document.querySelector('#team h2').textContent='The people who make this idea stronger.';
document.querySelector('#team .head p').textContent='Shared interests point the team in one direction. Complementary skills help it move.';
document.querySelector('.footer').textContent='Mustang Match is a student-built prototype. Project recommendations and teammate profiles are illustrative.';
const priorIdeas=ideas,priorTeam=team;
ideas=function(){priorIdeas();const top=document.querySelector('.card.top');if(top){const ribbon=top.querySelector('.ribbon');if(ribbon)ribbon.textContent='YOUR #1 MATCH';const why=top.querySelector('p:last-of-type');if(why)why.innerHTML='<b>Why this project fits you:</b> It aligns with your interests, skills, goals, and available time.';}};
team=function(){priorTeam();const n=document.querySelector('.network h3');if(n)n.textContent='YOU → PROJECT → TEAM';const cover=document.querySelector('#coverage p');if(cover)cover.innerHTML='You bring the starting point. Together, this group covers the key skills needed to turn <b>'+s.p[0]+'</b> into a strong first version.';document.querySelectorAll('.people .person').forEach((card,i)=>{const fit=card.querySelector('.fit');if(fit)fit.textContent=fit.textContent+' COMPATIBILITY';card.style.animationDelay=(i*.13)+'s';});};
