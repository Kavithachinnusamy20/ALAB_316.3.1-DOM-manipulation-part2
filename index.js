//part 1
// Select and cache the <main> element in a variable named mainEl.

const mainEL = document.querySelector('main');
// Set the background color of mainEl
mainEL.style.backgroundColor = 'var(--main-bg)';
// Set the content of mainEl to <h1>DOM Manipulation</h1>. 
mainEL.innerHTML = '<h1>DOM Manipulation</h1>';
mainEL.classList.add('flex-ctr');
// Part 2: Creating a Menu Bar
// 1 Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");
// 2 Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';
// 3 Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
// 4 Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');

// Part 3: Adding Menu Buttons

// var menuLinks = [
// { text: 'about', href: '/about' },
// { text: 'catalog', href: '/catalog' },
// { text: 'orders', href: '/orders' },
// { text: 'account', href: '/account' },
// ];

var menuLinks = [
  { text: 'about', href: '/about' },
  {
    text: 'catalog', href: '#', subLinks: [
      { text: 'all', href: '/catalog/all' },
      { text: 'top selling', href: '/catalog/top' },
      { text: 'search', href: '/catalog/search' },
    ]
  },
  {
    text: 'orders', href: '#', subLinks: [
      { text: 'new', href: '/orders/new' },
      { text: 'pending', href: '/orders/pending' },
      { text: 'history', href: '/orders/history' },
    ]
  },
  {
    text: 'account', href: '#', subLinks: [
      { text: 'profile', href: '/account/profile' },
      { text: 'sign out', href: '/account/signout' },
    ]
  },
];

menuLinks.forEach(link => {
  const a = document.createElement('a');
  a.setAttribute('href', link.href);
  a.textContent = link.text;
  topMenuEl.appendChild(a);
});
//R-ALAB 316.3.1: DOM Manipulation (Part Two) 
//Part 2 step3: Creating the Submenu

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.postion = 'absolute';
subMenuEl.style.top = '0';
//part 4 Adding Menu Interaction
//step1
const topMenuLinks = document.querySelectorAll("a");


function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = "";  // Clear existing submenu
  subLinks.forEach(subLink => {
    const a = document.createElement('a');
    a.setAttribute('href', subLink.href);
    a.textContent = subLink.text;
    subMenuEl.appendChild(a);
  })
}


topMenuEl.addEventListener("click", (e) => {

  //step2 -1
  e.preventDefault();
  //step2-2
  if (!e.target.matches("a")) {
    return;
  }
  //step2-3
  console.log(e.target.textContent);

  // remove the active class of other menu
  topMenuLinks.forEach(aElements => {
        aElements.classList.remove("active");
        subMenuEl.style.top = "0";
     }
  )

  // e.target.classList.add("active")
  //  we need to check if it already active in the case we remove it otherwise we add it   // 2 The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active")
  } else {
    e.target.classList.add("active")
  }

  //Part 5: Adding Submenu Interaction

  const clickedLink = menuLinks.find(link => link.text === e.target.textContent);

  if (clickedLink.subLinks) {
    subMenuEl.style.top = "100%";
    buildSubmenu(clickedLink.subLinks); // Call the helper function
  } else {
    subMenuEl.style.top = "0";
    subMenuEl.innerHTML = "";
  }

}
)

// Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener("click", (e) => {

  //step2 -1
  e.preventDefault();
  //step2-2
  if (!e.target.matches("a")) {
    return;
  }
  console.log(e.target.textContent); // Log clicked link content
  subMenuEl.style.top = "0"; // Hide submenu after click

  // Remove "active" class from top menu links
  document.querySelectorAll("#topMenuEl a").forEach(link => {
    link.classList.remove("active");
  })

  // Update the <h1> inside mainEl with the clicked submenu text
  const mainEl = document.querySelector("main h1");
  mainEl.textContent = e.target.textContent  ;
});





