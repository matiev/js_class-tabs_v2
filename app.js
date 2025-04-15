class Tabs {
  constructor(tabsContent, idx) {
    this.tabsContent = tabsContent,
    this.idx = idx,
    this.content()
  }
  content() {
    this.tabsInner = document.createElement('div');
    this.tabsContent.tabsContentItemArr = [];
    this.tabsInner.classList.add('tabs__inner')
    this.tabsInner.append(this.tabsContent)
    document.body.append(this.tabsInner)
    Array.from(this.tabsContent.children).forEach(item => {
      this.tabsContent.tabsContentItemArr.push(item.textContent.split(' ')[0]);
      item.textContent = item.textContent.substring(item.textContent.indexOf(' ') + 1, item.textContent.length)
    });
    this.idx++;
    this.nav();
  }
  nav() {
    let tabsNav = document.createElement('div');
    this.tabsContent.tabsList = document.createElement('ul');
    tabsNav.classList.add('tabs__nav');
    this.tabsContent.tabsList.classList.add('tabs__list');
    for (let i=0; i<this.tabsContent.tabsContentItemArr.length; i++) {
      let tabsItem = document.createElement('li');
      this.tabsContent.tabsLink = document.createElement('a');
      tabsItem.classList.add('tabs__item');
      this.tabsContent.tabsLink.classList.add('tabs__link');

      this.tabsContent.tabsLink.textContent = this.tabsContent.tabsContentItemArr[i];
      this.tabsContent.tabsLink.setAttribute('href', `#${this.tabsContent.tabsContentItemArr[i]}-${this.idx}`);

      this.tabsContent.children[i].setAttribute('id', `${this.tabsContent.tabsContentItemArr[i]}-${this.idx}`)

      tabsNav.append(this.tabsContent.tabsList)
      this.tabsContent.tabsList.append(tabsItem)
      tabsItem.append(this.tabsContent.tabsLink)
      this.tabsInner.insertBefore(tabsNav, this.tabsContent);     
    }
    this.render();
  }    

  render() {
    this.tabsContent.textBlocks = this.tabsContent.children;
    this.tabsContent.tabsLinks = this.tabsContent.tabsList.querySelectorAll('a');
    let parThis = this;
    Array.from(this.tabsContent.tabsLinks).forEach(item => {
      item.addEventListener('click', function(event) {
        // event.preventDefault();
        let currentLink = this;
        let tabId = currentLink.getAttribute('href');
        let currentBlock = document.querySelector(tabId);
        if (!currentLink.closest('.tabs--active')) {
          Array.from(parThis.tabsContent.tabsLinks).forEach(item => item.classList.remove('tabs--active'));
          Array.from(parThis.tabsContent.textBlocks).forEach(item => item.classList.remove('tabs--toggle'));
        }

        currentLink.classList.add('tabs--active');
        currentBlock.classList.add('tabs--toggle');
      })
    })
    this.tabsContent.tabsLinks[0].click()
  }
}

let tabsContents = document.querySelectorAll('.tabs__content');
for (let i=0; i<tabsContents.length; i++) {  
  new Tabs(tabsContents[i], i);
}




