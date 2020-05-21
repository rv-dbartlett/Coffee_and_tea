// 3rd part libraries
var selenium = require('selenium-webdriver');
var chai = require('chai');
var sinon = require("sinon");
var chaiSinon = require("sinon-chai");
var chaiHttp = require('chai-http');
var chaiWebdriver = require('chai-webdriver');


// Assertion handlers
var expect = chai.expect;
chai.should();
var assert = chai.assert;

// Assertion helpers
chai.use(chaiSinon);
chai.use(chaiHttp);

// Module we're testing
const helloWorld = require('./hello.js')


describe("When we run tests they", () => {
    it("should output something", () => {

    });
    it("should see 1 as 1", () => {
        expect(1).to.be.equal(1);
    });
    it("should NOT see 1 as 2", () => {
        expect(1).not.to.be.equal(2);
    });
    it("should see 1 as 1 from a variable", () => {
        var num = 1;
        expect(1).to.be.equal(num);
    });
});
describe("When hello module", () => {
    describe("loads page", () => {
        it("will return HTML", () => {
            var html = helloWorld.loadPage();
            
            expect(html).to.contain("Hello World!");
            
            html.should.include("Hello World!");
            
            assert.include(html, "Hello World!");
        });
    });
});
describe("When Express serves", () => {
    describe("the / route", () => {
        let res;
        let sandbox;
        beforeEach(() => {
            sandbox = sinon.createSandbox();
            res = {
                send: () => {}
            }
        })
        it(`should have called res.send()`, () => {
            var resSpy = sandbox.spy(res, "send");
            helloWorld.hello({}, res);
            resSpy.should.have.been.called;
        })
        afterEach(() => {
            sandbox.restore();
        })
    })
})
describe("When we test", () => {
    describe("the API",() => {
        it("should return html from /", (done) => {
            chai.request('http://localhost:3000').get('/')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.text).to.contain("Hello World!");
                done();
            });
        });
    })
    describe("the browser",() => {
        let driver; // Declare it here.
        before( async () => {
            driver = new selenium.Builder().withCapabilities(
                selenium.Capabilities.chrome()
            ).build();
            await driver.get('http://localhost:3000');
        });
        after(() => {
            driver.quit();
        });
        it("should show Hello World!", async () => {
            await driver.wait(selenium.until.elementLocated(selenium.By.tagName('body')));
            const body = await driver.findElement(selenium.By.tagName('body')).getText();
            expect(body).to.contain("Hello World!");
            expect(body).to.not.contain("I'm a kitty!");
        }).timeout(10000);
    })
})