import { GLTF, GLTFLoaderPlugin, GLTFParser } from 'three-stdlib';

export class CesiumRTCPlugin implements GLTFLoaderPlugin {
  readonly name = 'CESIUM_RTC';

  constructor(private readonly parser: GLTFParser) {}

  afterRoot(result: GLTF): null {
    if (this.parser.json.extensions?.CESIUM_RTC?.center != null) {
      const { center } = this.parser.json.extensions.CESIUM_RTC;
      result.scene.position.set(...center);
    }
    return null;
  }
}
