export class Topic {
    constructor(id, name, fund, backers) {
        this.id = id
        this.name = name
        this.fund = fund
        //this.backers = backers
    }

    //getBackers() {
    //    const backerNames = this.backers.map(backer => backer.name)
    //    return backerNames
    //}
}

    //backers: [
    //    {
    //        "userID": "123", "firstName": "joe", "lastName": "johnson",
    //        "Projects": [], "wallet": "EFJCKD1000030301"
    //    },
    //    {
    //        "userID": "133", "firstName": "luke", "lastName": "leddy",
    //        "Projects": [], "wallet": "EFJCKDRi30191821"
    //    },
    //    {
    //        "userID": "143", "firstName": "frank", "lastName": "fromisland",
    //        "Projects": [], "wallet": "DJABEFDj029348301"
    //    }
    //],

//const backers = require('./backers.json')
//console.log(backers)
//const a = new Topic(1, "environement", 100, backers.Backers)
//console.log(a)