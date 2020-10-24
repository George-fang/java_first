// 这里主要写了一个rsa加密的算法，算法需要给出一个公钥对，以及需要加密的数据，在本处进行加密

/**
 * 给出底数，指数、取余基数，返回计算结果
 * @param {long} base 底数
 * @param {long} power 指数
 * @param {long} mod 取余计数
 * @returns {Integer} base&power % mod
 */
const fastPower = function(base, power, mod){
    base = BigInt(base.charCodeAt());
    let ans = BigInt(1)
    let cur = BigInt(base % mod);
    while(power != 0n){
        if(power % 2n == 1n){
            ans = (ans * cur) % mod;
        }
        cur = (cur * cur) % mod;
        power = power / 2n;
    }
    return ans;
}

/**
 * 给出一个公钥对，以及需要加密的字符串，在此进行加密
 * @param {String} beforeLockStr 需要加密的字符串
 * @param {e: long, n: long}} RsaKey 公钥对
 */
const doLock = function(beforeLockStr, RsaKey){
    let res = []
    let len = beforeLockStr.length; // 长度
    for(let i = 0; i < len; i++){
        let curChar = beforeLockStr[i]; // 获取当前位置字符
        res.push(BigInt.asIntN(64, fastPower(curChar, BigInt(RsaKey.e), BigInt(RsaKey.n))));
    }
    return res;
}


// ------------------- 使用方法演示 -------------------------------------
// console.log(doLock("i am your father", {n: 4323811010809,e:1492529}))
/* 
返回内容：
[
  1606295181766n, 2989297196070n,
  1528501915599n, 3022507811145n,
  2989297196070n, 1098813954839n,
   433035256247n, 2953097659632n,
   749375974521n, 2989297196070n,
   290378395333n, 1528501915599n,
  1212530680955n,  739950567057n,
  2664009518773n,  749375974521n
]
*/