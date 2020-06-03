import PSDGuides from '../';

import 'jsdom-global/register';
import { describe, Try } from 'riteway';

const { log } = console;

const defaultConfig = {
  canvas: document.body,
  canvasWidth: 0,
  alignment: 'center',
  backColor: "rgba(132, 170, 234, 0.25)",
  lineColor: "rgba(73, 141, 255, 1)",
  horizontalGuides: [],
  verticalGuides: [],
  zindex: 9999
};

describe('constructor', async assert => {
  // TODO: fix this
  // assert({
  //     given: 'no arguments',
  //     should: 'throw',
  //     actual: Try(new PSDGuides).toString(),
  //     expected: 'xxx TypeError: Cannot convert undefined or null to object'
  // });
  //

  const guides = new PSDGuides({});

  assert({
    given: 'empty object',
    should: 'return instance',
    // actual: new PSDGuides({}) instanceof PSDGuides,
    actual: guides instanceof PSDGuides,
    expected: true
  });

  assert({
    given: 'empty object',
    should: 'use default config',
    actual: guides.config,
    expected: defaultConfig
  });

  assert({
    given: 'canvasWidth option equal to 852',
    should: 'set canvasWidth to 852',
    actual: new PSDGuides({
      canvasWidth: 852
    }).config.canvasWidth,
    expected: 852
  })

  assert({
    given: 'horizontalGuides: [20, "355 * 2", 250, 20]',
    should: 'set horizontalGuides',
    actual: new PSDGuides({
      horizontalGuides : [20, "355 * 2", 250, 20]
    }).config.horizontalGuides,
    expected: [20, "355 * 2", 250, 20]
  });
});

describe('DOM', async assert => {
  const a = new PSDGuides({ canvas: document.body });
  assert({
    given: 'new PSDGuides({ canvas: document.body })',
    should: 'find psd-guides-wrapper element',
    actual: document.body.querySelector('.psd-guides-wrapper').constructor.name,
    expected: 'HTMLDivElement'
  });

  assert({
    given: 'new PSDGuides({ canvas: document.body })',
    should: 'psd-guides-wrapper be a child of document.body',
    actual: document.body.querySelector('.psd-guides-wrapper').parentElement,
    expected: document.body
  });

  assert({
    given: 'new PSDGuides({ canvas: document.body })',
    should: 'psd-guides-wrapper be hidden by default',
    actual: document.body.querySelector('.psd-guides-wrapper').style.display,
    expected: 'none'
  });

  const b = new PSDGuides({ horizontalGuides: [10, "20 * 2", 10] });
  assert({
    given: '{ horizontalGuides: [10, "20 * 2", 10]}',
    should: 'horizontalGuides wrapper should have 4 children',
    actual: b._ui.hContainer.childElementCount,
    expected: 4
  });

  const c = new PSDGuides({ verticalGuides: [10, "20 * 4", 10] });
  assert({
    given: '{ verticalGuides: [10, "20 * 4", 10]}',
    should: 'verticalGuides wrapper should have 6 children',
    actual: c._ui.vContainer.childElementCount,
    expected: 6
  });
});

describe('activate', async assert => {
  assert({
    given: 'instance.activate()',
    should: 'set instance.active to true',
    actual: new PSDGuides({}).activate().active,
    expected: true
  });

  assert({
    given: 'guides.activate()',
    should: 'display psd-guides-wrapper element',
    actual: new PSDGuides({}).activate()._ui.wrapper.style.display,
    expected: ''
  });
});

describe('deactivate', async assert => {
  assert({
    given: 'instance.deactivate()',
    should: 'set instance.active to false',
    actual: new PSDGuides({}).deactivate().active,
    expected: false
  });

  assert({
    given: 'guides.deactivate()',
    should: 'hide psd-guides-wrapper element',
    actual: new PSDGuides({}).deactivate()._ui.wrapper.style.display,
    expected: 'none'
  })
});

describe('update', async assert => {
  const a = new PSDGuides({});

  assert({
    given: 'guides.update()',
    should: 'update verticalGuides',
    actual: a.addVerticalGuides([10, '20 * 2', 10]).update().getVerticalGuides(),
    expected: [10, 20, 20, 10]
  });

  assert({
    given: 'guides.update()',
    should: 'update horizontalGuides',
    actual: a.addHorizontalGuides([10, '20 * 2', 10]).update().getHorizontalGuides(),
    expected: [10, 20, 20, 10]
  });
});

describe('addHorizontalGuides', async assert => {
  assert({
    given: 'guides.addHorizontalGuides([100, 200, 300])',
    should: 'concatenate guides to horizontalGuides',
    actual: new PSDGuides({}).addHorizontalGuides([100, 200, 300]).getHorizontalGuides(),
    expected: [100, 200, 300]
  });
});

describe('getHorizontalGuides', async assert => {
  const horizontalGuides = [10, '100 * 2', '200 * 4', 10];
  assert({
    given: 'guides.getHorizontalGuides()',
    should: 'return parsed horizontal guides',
    actual: new PSDGuides({ horizontalGuides }).getHorizontalGuides(),
    expected: [10, 100, 100, 200, 200, 200, 200, 10]
  });
});

describe('removeHorizontalGuides', async assert => {
  const a = new PSDGuides({ horizontalGuides: [100, 200] });
  assert({
    given: 'guides.removeHorizontalGuides()',
    should: 'set config.horizontalGuides to []',
    actual: a.removeHorizontalGuides().getHorizontalGuides(),
    expected: []
  });
});

describe('addVerticalGuides', async assert => {
  assert({
    given: 'guides.addVerticalGuides([100, 200, 300])',
    should: 'concatenate guides to verticalGuides',
    actual: new PSDGuides({}).addVerticalGuides([100, 200, 300]).getVerticalGuides(),
    expected: [100, 200, 300]
  });
});

describe('getVerticalGuides', async assert => {
  const verticalGuides = [10, '100 * 2', '200 * 4', 10];
  assert({
    given: 'guides.getVerticalGuides()',
    should: 'return parsed vertical guides',
    actual: new PSDGuides({ verticalGuides }).getVerticalGuides(),
    expected: [10, 100, 100, 200, 200, 200, 200, 10]
  });
});

describe('removeVerticalGuides', async assert => {
  const a = new PSDGuides({ verticalGuides: [100, 200] });
  assert({
    given: 'guides.removeVerticalGuides()',
    should: 'set config.verticalGuides to []',
    actual: a.removeVerticalGuides().getVerticalGuides(),
    expected: []
  });
});

describe('removeGuides', async assert => {
  const a = new PSDGuides({ horizontalGuides : ["(10, 60, 10) * 12"], verticalGuides: ["(10, 60, 10) * 12"] }).removeGuides();
  assert({
    given: 'guides.removeGuides()',
    should: 'clear both vertical array references',
    actual: a.getVerticalGuides(),
    expected: []
  });

  assert({
    given: 'guides.removeGuides()',
    should: 'clear both horizontal array references',
    actual: a.getHorizontalGuides(),
    expected: []
  });
});

describe('destroy', async assert => {
  assert({
    given: 'instance.destroy()',
    should: 'return null',
    actual: new PSDGuides({}).destroy(),
    expected: null
  });

  assert({
    given: 'instance.destroy()',
    should: 'return return default config',
    actual: new PSDGuides({}).config,
    expected: defaultConfig
  });
});
