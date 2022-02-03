describe('The links on the website', () => {
    const visitLinkClosure = (startingUrls, done) => {
        let state = {
            visited: {},
            queue: startingUrls
        }
        const v = () => {
            if(!state.queue.length) {
                done();
            } else {
                let newLoc = state.queue.pop();
                state.visited[newLoc] = true;
                return cy.visit(newLoc, {
                    onBeforeLoad(win) {
                        cy.stub(win.console, 'error').as('consoleError');
                        cy.stub(win.console, 'warn').as('consoleWarn');
                    }
                }).location().then((loc) => {
                    let basepath = "/";
                    if (loc.pathname.indexOf("/") > -1) {
                        basepath = loc.pathname.substring(0, loc.pathname.lastIndexOf("/") + 1);
                    }
                    cy.get('body').then(($body) => {
                        // check for links on page
                        // (without $body.find it errors here - cy.get expects the elements to exist)
                        if ($body.find('a:not(.no-href-check)').length) {
                            cy.get('a:not(.no-href-check)').each((link, idx, collection) => {
                                let href = link.attr("href");
                                expect(href+','+link.attr("class")).to.not.contain("no-href-check");
                                cy.get('@consoleError').should('not.be.called');
                                cy.get('@consoleWarn').should('not.be.called');
                                if (!href.startsWith("/")) {
                                    href = basepath + href;
                                }
                                if(state.visited[href]) {
                                    state.queue.push(href);
                                }
                            });
                        }
                    })
                }).then(v);
            }
        }
        return v();
    }
    it('should not be broken', (done) => {
        return visitLinkClosure(['/'], done);
    })
})