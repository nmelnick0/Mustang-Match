/* Team-result presentation. This layer deliberately reuses the existing deterministic scores. */
const studyLabel={cs:'Computer Science',business:'Business',design:'Design / Graphic Comm',engineering:'Engineering / Data'};
const skillLabel=skill=>L(skill==='build'?'code':skill);
const displaySkills=skills=>skills.map(skillLabel).join(' · ');

function roleChoices(person,project){
  const skills=person.skills,needs=projectNeeds(project);
  const choices=[];
  if(skills.includes('code')&&skills.includes('data'))choices.push(needs.includes('data')?'AI / Backend':'Technical Lead');
  if(skills.includes('code'))choices.push('Frontend Builder');
  if(skills.includes('design'))choices.push('Product Designer');
  if(skills.includes('data'))choices.push('Data & Insights');
  if(skills.includes('product')&&skills.includes('marketing'))choices.push('Growth & Validation');
  if(skills.includes('marketing'))choices.push('Community Lead');
  if(skills.includes('product'))choices.push('Product Lead');
  if(skills.includes('build'))choices.push('Prototype Engineer');
  return [...new Set(choices)];
}

function assignRoles(matches,project){
  const used=new Set();
  return matches.map(person=>{
    const choices=roleChoices(person,project);
    const role=choices.find(choice=>!used.has(choice))||choices[0]||'Project Contributor';
    used.add(role);
    return {...person,role};
  });
}

function firstContribution(person,project){
  const target=project[4].toLowerCase();
  if(person.role==='Technical Lead'||person.role==='AI / Backend'||person.role==='Frontend Builder'||person.role==='Prototype Engineer')return `Build the first ${project[0]} working flow for ${target}.`;
  if(person.role==='Product Designer')return `Design the first ${project[0]} onboarding and core screen.`;
  if(person.role==='Data & Insights')return `Create the first ${project[0]} insights dashboard.`;
  if(person.role==='Growth & Validation')return `Interview 10 ${target} and test the ${project[0]} pitch.`;
  if(person.role==='Community Lead')return `Recruit five ${target} for the first ${project[0]} test.`;
  if(person.role==='Product Lead')return `Define the first ${project[0]} test with real ${target}.`;
  return `Turn the ${project[0]} MVP into a focused first test.`;
}

function whyMatch(person,project){
  const shared=person.interests.filter(item=>s.interests.includes(item)||project[6].includes(item)).map(L);
  const relevant=person.skills.filter(skill=>projectNeeds(project).includes(skill)).map(skillLabel);
  const parts=[];
  if(shared.length)parts.push(`Shared ${shared.join(' and ').toLowerCase()} focus`);
  if(relevant.length)parts.push(`${relevant.join(' and ')} fits the MVP`);
  if(Math.abs(person.hours-s.hours)<=2)parts.push('a similar weekly pace');
  return parts.slice(0,2).join(', ')||'A useful mix of project skills and pace';
}

function coverageSummary(covered){
  const capabilities=[['product','Product'],['code','Engineering / Coding'],['design','Design'],['marketing','Marketing'],['data','Data / AI']];
  const strengths=capabilities.filter(([key])=>covered.has(key)).map(([,label])=>label);
  const gaps=capabilities.filter(([key])=>!covered.has(key)).map(([,label])=>label);
  const strengthText=strengths.length?`Strong on ${strengths.join(', ')}.`:'This team needs a clearer skill mix.';
  const gapText=gaps.length?`${gaps.join(' and ')} ${gaps.length===1?'is':'are'} the main ${gaps.length===1?'gap':'gaps'}.`:'The core capabilities for a first version are covered.';
  return `${strengthText} ${gapText}`;
}

const scoredTeam=team;
team=function(){
  const project=s.p;
  const rawMatches=T.map(person=>[...person,teammateScore(person,project)]).sort((a,b)=>b[8]-a[8]).slice(0,3);
  const matches=assignRoles(rawMatches.map(person=>({name:person[0],initial:person[1],major:person[2],skills:person[3],interests:person[4],hours:person[6],score:person[8]})),project);
  const ownSkills=displaySkills(s.skills);
  const covered=new Set([...s.skills,...matches.flatMap(person=>person.skills)].map(skill=>skill==='build'?'code':skill));
  const capabilities=[['product','Product'],['code','Engineering / Coding'],['design','Design'],['marketing','Marketing'],['data','Data / AI']];

  document.querySelector('#picked').innerHTML=`<p class="eyebrow">Selected Project</p><h3>${project[0]}</h3><strong class="selected-score">${project[10]}% <span>match</span></strong><p class="selected-description">${project[2]}</p><div class="brings"><b>You bring</b><span>${ownSkills}</span></div>`;
  document.querySelector('.network').innerHTML=`<div class="team-flow" aria-label="You, selected project, and matched team"><div class="flow-node you-node"><b>You</b><span>${studyLabel[s.major]}</span><small>${ownSkills}</small></div><i class="connector" aria-hidden="true"></i><div class="flow-node project-node"><b>${project[0]}</b><span>${project[10]}% match</span><small>${project[6].map(L).join(' · ')}</small></div><i class="connector" aria-hidden="true"></i><div class="flow-node team-node"><b>Team</b><span>${matches.map(person=>person.name).join(' · ')}</span><small>${matches.map(person=>person.role).join(' · ')}</small></div></div>`;
  document.querySelector('#people').innerHTML=matches.map(person=>`<article class="person"><b class="fit"><strong>${person.score}%</strong><span>match</span></b><div class="avatar">${person.initial}</div><h3>${person.name}</h3><p class="major">${person.major}</p><div class="person-detail"><b>Role on this project</b><strong>${person.role}</strong></div><div class="person-detail"><b>Why they match</b><span>${whyMatch(person,project)}</span></div><div class="person-detail"><b>They add</b><span>${displaySkills(person.skills)}</span></div><div class="person-detail contribution"><b>First contribution</b><strong>${firstContribution(person,project)}</strong></div><p class="availability">${person.hours} hrs/week</p></article>`).join('');
  document.querySelector('#coverage').innerHTML=`<h3>Why This Team Works</h3><p>${coverageSummary(covered)}</p><div class="coverage">${capabilities.map(([key,label])=>`<span class="${covered.has(key)?'covered':'gap'}">${covered.has(key)?'✓':'○'} ${label}</span>`).join('')}</div>`;
  document.querySelector('.final').innerHTML=`<div><p class="eyebrow">Join the Builder Pool</p><h2>Save your profile for future matching.</h2><p>This prototype stores your profile on this device. A future version could use it to connect compatible Cal Poly students.</p><form class="pool" id="pool"><input id="pool-email" name="calpoly-email" type="email" required placeholder="you@calpoly.edu" aria-label="Cal Poly email"><button class="btn" type="submit">Save my profile</button><p class="msg"></p></form></div>`;
  const form=document.querySelector('#pool');
  form.onsubmit=event=>{event.preventDefault();const email=document.querySelector('#pool-email'),message=form.querySelector('.msg'),value=email.value.trim().toLowerCase();if(!/^[^\s@]+@calpoly\.edu$/.test(value)){message.textContent='Enter a valid @calpoly.edu email address.';return}localStorage.setItem('mustang-match-pool',JSON.stringify({email:value,area:s.major,skills:s.skills,interests:s.interests,project:project[0],hours:s.hours}));message.textContent='Profile saved on this device.';email.value=value;email.disabled=true;form.querySelector('button').disabled=true;};
  const change=document.querySelector('#change');
  change.textContent='← Change Project';
  change.onclick=()=>show('ideas');
  document.querySelectorAll('.restart').forEach(button=>{button.textContent='Start Over';button.onclick=()=>location.reload()});
};
