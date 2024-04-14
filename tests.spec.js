import axios from "axios";
import { expect } from 'chai'

const authorizationToken = 'ghp_0000000000DUMMY-TOKEN000000000000000'
const authorizationHeader = `Bearer ${authorizationToken}`


describe("Test_1 Check repo", () => {

    it("GET/user/starred", async () => {
        console.log('Test start get info about repo');

        let response = null;

        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }

        //console.log('Test response get user: ', response.data);

        // Check that staus code 200
        expect(response.status).equals(200);
        console.log("response status is: ", response.status);

        //Check that response contain data
        const containData = expect(response.data).to.exist;
        console.log("response data is:", containData);

        //Check that response contain array
        expect(Array.isArray(response.data)).to.be.true;
        console.log("it is true or not ");

        //Check that arrain contain not more than 10 records
        expect(response.data.length).to.be.at.most(10);
        console.log("response. data. length: ", response.data.length);

        //Check response's structure
        response.data.forEach(repo => {
            const namePropery = expect(repo).to.have.property('name');
            console.log("data to have name Property1: ", namePropery);

            const descriptionPropery = expect(repo).to.have.property('description');
            console.log("data to have description Property: ", descriptionPropery);
            
            const urlPropery = expect(repo).to.have.property('html_url');
            console.log("data to have url Property: ", urlPropery);
            
            const ownerProperty =  expect(repo).to.have.property('owner');
            console.log("data to have owner Property: ", ownerProperty);

            const lofinProperty = expect(repo.owner).to.have.property('login');
            console.log("data to have login Property: ", lofinProperty);
        });

    });

});


describe("Test_2 Check that User added star for repo", () => {
    let response = null;

    it("GET", async () => {
        console.log('Check that repo "new" dont have a star');
        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }

        response.data.forEach(repo => {
        const namePropery = expect(repo).to.have.property('name');
        console.log("data to have name Property2: ", namePropery);
        });

    });

    it("PUT /user/starred", async () => {
        console.log('Test start add star');

        //let response = null;

        try {

            response = await axios({
                method: 'put',
                url: 'https://api.github.com/user/starred/kaptikova/new',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }           

    });

    it("GET", async () => {
        console.log('Check that repo "new" dont have a star');
        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }

        response.data.forEach(repo => {
        const namePropery = expect(repo).to.have.property('name');
        console.log("data to have name Property3: ", namePropery);
        });

});

});


describe("Test_3 Check that User can delete a ster for repo", () => {
  

    it("DELETE /user/starred", async () => {
        console.log('Test start add star');

        let response = null;

        try {

            response = await axios({
                method: 'delete',
                url: 'https://api.github.com/user/starred/kaptikova/new',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }           

    });

    it("GET", async () => {
        
        let response = null;

        console.log('Check that repo "new" dont have a star');
        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get user: ', error);
        }

        response.data.forEach(repo => {
        const namePropery = expect(repo).to.have.property('name');
        console.log("data to have name Property4: ", namePropery);
        });

});
});


describe("Test_4 Check negative scenario", () => {
    

    it("Check that User can not login with incorrect token", async () => {
        console.log('GET/uer/incorrect token');

        let response = null;

        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred/kaptikova/new',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': `Bearer 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`,
                },
                owner: 'OWNER',
                repo: 'REPO',

            });

            console.log('Test error incorrect token1: ', error);

        } catch (error) {
            console.log('Test error incorrect token2: ', error);
        }           

    });


    it("Check that User can not delete a star if repo does not have one", async () => {
        console.log('Delete/uer/incorrect repo');

        let response = null;

        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred/kaptikova/helloci',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error delete incorrect repo: ', error);
        }           

    });

    it("Check that User can not check have or not pero a star if repo incorrect", async () => {
        console.log('GET/uer/incorrect repo');

        let response = null;

        try {

            response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/starred/kaptikova/HTT',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                    'Authorization': authorizationToken,
                },
                owner: 'OWNER',
                repo: 'REPO'
            });

        } catch (error) {
            console.log('Test error get incorrect repo: ', error);
        }           

    });

});