function openTab(tabtype, tabName) {
  var i, tabs;

  tabs = document.getElementsByClassName(tabtype);
  for (i = 0; i < tabs.length; i++) {
    console.log(tabs[i].classList);

    if (tabs[i].classList.contains(tabName)) {
      tabs[i].classList.remove("hide");
    } else {
      tabs[i].classList.add("hide");
      console.log("jhjhv");
    }
  }
}
