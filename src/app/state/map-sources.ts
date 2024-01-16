import { ZsMapStateSource } from './interfaces';
import OlTileXYZ from 'ol/source/XYZ';
import { PMTilesVectorSource } from 'ol-pmtiles';
import { TileImage } from 'ol/source';
import OlTileLayer from 'ol/layer/Tile';
import VectorTile from 'ol/layer/VectorTile';
import { Layer } from 'ol/layer';
import { applyStyle } from 'ol-mapbox-style';

export class ZsMapSources {
  static getOlTileLayer(source: TileImage) {
    return new OlTileLayer({
      zIndex: 0,
      source,
    });
  }

  static get(source: ZsMapStateSource): Layer {
    switch (source) {
      case ZsMapStateSource.GEO_ADMIN_SWISS_IMAGE:
        return ZsMapSources.getOlTileLayer(
          new OlTileXYZ({
            attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'],
            url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg',
          }),
        );
      case ZsMapStateSource.GEO_ADMIN_PIXEL:
        return ZsMapSources.getOlTileLayer(
          new OlTileXYZ({
            attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'],
            url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg',
          }),
        );
      case ZsMapStateSource.GEO_ADMIN_PIXEL_BW:
        return ZsMapSources.getOlTileLayer(
          new OlTileXYZ({
            attributions: ['<a target="new" href="https://www.swisstopo.admin.ch/internet/swisstopo/en/home.html">swisstopo</a>'],
            url: 'https://wmts10.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg',
          }),
        );
      case ZsMapStateSource.LOCAL: {
        const layer = new VectorTile({
          declutter: true,
          source: new PMTilesVectorSource({
            url: 'https://zskarte.blob.core.windows.net/etienne/ch.swisstopo.pmtiles',
          }),
          style: null,
        });

        applyStyle(layer, '/assets/map-style.json');

        return layer;
      }
      case ZsMapStateSource.OPEN_STREET_MAP:
      case undefined:
        return ZsMapSources.getOlTileLayer(
          new OlTileXYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        );
      default:
        console.error(`Map source ${source} is not implemented`);
        return ZsMapSources.getOlTileLayer(
          new OlTileXYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        );
    }
  }
}
