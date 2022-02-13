

class Topic{
    constructor(id, name, fund, backers){
        this.id = id
        this.name = name
        this.fund = fund
        this.backers = backers
    }

    getBackers(){
        const backerNames = this.backers.map(backer => backer.name)
        return backerNames
    }
}


const backers = require('./backers.json')
console.log(backers)
const a = new Topic(1, "environement", 100, backers.Backers)
console.log(a)