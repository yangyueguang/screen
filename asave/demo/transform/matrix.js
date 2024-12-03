/**
 * Created by wanghx on 2015/7/12.
 * 矩阵计算组件
 */
!function(root , fatory){
    if('define' in root && define.cmd){
        define(function(require, exports, module){
            module.exports = fatory()
        })
    }else if(typeof module === "object" && module.exports){
        module.exports = fatory()
    }else {
        window.matrix = fatory()
    }
}(this , function(){
    /**
     * 根据变化前后的点坐标，计算矩阵
     * @param arg_1     变化前坐标1
     * @param _arg_1    变化后坐标1
     * @param arg_2     变化前坐标2
     * @param _arg_2    变化后坐标2
     * @param arg_3     变化前坐标3
     * @param _arg_3    变化后坐标3
     * @returns {{a: number, b: number, c: number, d: number, e: number, f: number}}
     */
    function getMatrix(arg_1 , _arg_1 , arg_2 , _arg_2 , arg_3 , _arg_3){
        //传入x值解第一个方程 即  X = ax + cy + e 求ace
        //传入的四个参数，对应三元一次方程：ax+by+cz=d的四个参数：a、b、c、d，跟矩阵方程对比c为1
        let arr1 = [arg_1.x , arg_1.y , 1 , _arg_1.x]
        let arr2 = [arg_2.x , arg_2.y , 1 , _arg_2.x]
        let arr3 = [arg_3.x , arg_3.y , 1 , _arg_3.x]
        let result = equation(arr1 , arr2 , arr3)
        //传入y值解第二个方程 即  Y = bx + dy + f 求 bdf
        arr1[3] = _arg_1.y
        arr2[3] = _arg_2.y
        arr3[3] = _arg_3.y
        let result2 = equation(arr1 , arr2 , arr3)
        //获得a、c、e
        let a = result.x
        let c = result.y
        let e = result.z;
        //获得b、d、f
        let b = result2.x
        let d = result2.y
        let f = result2.z;
        return {
            a : a,
            b : b,
            c : c,
            d : d,
            e : e,
            f : f
        }
    }
    /**
     * 解三元一次方程，需要传入三组方程参数
     * @param arr1        第一组参数
     * @param arr2        第二组参数
     * @param arr3        第三组参数
     * @returns {{x: number, y: number, z: number}}
     */
    function equation(arr1 , arr2 , arr3){
        let a1 = +arr1[0]
        let b1 = +arr1[1]
        let c1 = +arr1[2]
        let d1 = +arr1[3]
        let a2 = +arr2[0]
        let b2 = +arr2[1]
        let c2 = +arr2[2]
        let d2 = +arr2[3]
        let a3 = +arr3[0]
        let b3 = +arr3[1]
        let c3 = +arr3[2]
        let d3 = +arr3[3]
        //分离计算单元
        let m1 = c1 - (b1 * c2 / b2)
        let m2 = c2 - (b2 * c3 / b3)
        let m3 = d2 - (b2 * d3 / b3)
        let m4 = a2 - (b2 * a3 / b3)
        let m5 = d1 - (b1 * d2 / b2)
        let m6 = a1 - (b1 * a2 / b2)
        //计算xyz
        let x = ((m1 / m2) * m3 - m5)/((m1 / m2) * m4 - m6)
        let z = (m3 - m4 * x) / m2;
        let y = (d1 - a1 * x - c1 * z) / b1;
        return {
            x : x,
            y : y,
            z : z
        }
    }
    return {
        getMatrix : getMatrix,
        equation : equation
    }
})
