function openTab(tabtype, tabName) {
  var i, tabs;
  var selecetd = document.getElementById("items");
  // console.log(selecetd);
  tabs = document.getElementsByClassName(tabtype);
  for (i = 0; i < tabs.length; i++) {
    console.log(selecetd);

    if (tabs[i].classList.contains(tabName)) {
      tabs[i].classList.remove("hide");
      // selected[i].classList.add("select");
    } else {
      tabs[i].classList.add("hide");
      // selected[i].classList.remove("select");
    }
  }
}
