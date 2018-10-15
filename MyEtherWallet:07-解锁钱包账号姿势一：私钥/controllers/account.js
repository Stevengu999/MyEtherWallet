let { success, fail } = require("../utils/myUtils")
let web3 = require("../utils/myUtils").getweb3()

//获取以太币余额
async function getAccountBalance(address) {
    let balance = await web3.eth.getBalance(address)
    return web3.utils.fromWei(balance, "ether")
}

//配置返回给前端的数据，包含以太币的数据，还会有Token的数据
async function setResponseData(account) {
    //获取账户余额
    let balance = await getAccountBalance(account.address)
    console.log(balance)

    let resData = success({
        balance: balance,
        address: account.address,
        privatekey: account.privateKey
    })

    //返回相应数据给前端
    return resData
}

module.exports = {
    unlockAccountWithPrivate: async (ctx) => {
        //１．获取私钥
        let privatekey = ctx.request.body.privatekey
        console.log(privatekey)
        //2.通过私钥解锁账户
        let account = web3.eth.accounts.privateKeyToAccount(privatekey)
        console.log(account)
        //３．将账户信息返回给前端
        ctx.body = await setResponseData(account)
    },
}