
import * as Cesium from 'cesium'//根据自己的实际路径修改

/**
 * 修改底图
 * @param viewer
 * @param options
 */
export function modifyMap(viewer: Cesium.Viewer, options: any) {
    const baseLayer = viewer.imageryLayers.get(0)
    //以下几个参数根据实际情况修改,目前我是参照火星科技的参数,个人感觉效果还不错
    baseLayer.brightness = options.brightness || 0.6
    baseLayer.contrast = options.contrast || 1.8
    baseLayer.gamma = options.gamma || 0.3
    baseLayer.hue = options.hue || 1
    baseLayer.saturation = options.saturation || 0
    const baseFragShader = (viewer.scene.globe as any)._surfaceShaderSet
        .baseFragmentShaderSource.sources
    for (let i = 0; i < baseFragShader.length; i++) {
        const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
        let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
        if (options.invertColor) {
            strT += `
      color.r = 1.0 - color.r;
      color.g = 1.0 - color.g;
      color.b = 1.0 - color.b;
      `
        }
        if (options.filterRGB.length > 0) {
            strT += `
      color.r = color.r * ${options.filterRGB[0]}.0/255.0;
      color.g = color.g * ${options.filterRGB[1]}.0/255.0;
      color.b = color.b * ${options.filterRGB[2]}.0/255.0;
      `
        }
        baseFragShader[i] = baseFragShader[i].replace(strS, strT)
    }
}
