(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches || !('IntersectionObserver' in window))return;

  // Only sibling-level elements are animated; no scroll-linked transforms.
  const selectors=['.for-head','.for-image','.for-card','.for-bottom','.intro-head','.feature','.section-top','.step','.step-detail','.product-gallery','.product-info','.city-text','.city-img','.video-card','.story-photo','.story-text','.moment-box','.faq > div','.faq-list details','.final > div'];
  const targets=[...document.querySelectorAll(selectors.join(','))].filter(el=>!el.parentElement.closest(selectors.join(',')));
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting)continue;
      entry.target.classList.remove('motion-wait');
      observer.unobserve(entry.target);
    }
  },{threshold:0,rootMargin:'0px 0px 80px 0px'});

  targets.forEach(el=>{
    const rect=el.getBoundingClientRect();
    if(rect.top>=window.innerHeight+80){el.classList.add('motion-wait');observer.observe(el)}
  });
  reduced.addEventListener?.('change',event=>{
    if(event.matches){observer.disconnect();document.querySelectorAll('.motion-wait').forEach(el=>el.classList.remove('motion-wait'))}
  });
})();
