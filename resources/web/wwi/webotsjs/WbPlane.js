// Copyright 1996-2020 Cyberbotics Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {WbGeometry} from "./WbGeometry.js"

class WbPlane extends WbGeometry{
  constructor(id, size) {
    super(id);
    this.size = size;
  }

  delete() {
    super.delete();
    _wr_static_mesh_delete(this.wrenMesh);
  }

  createWrenObjects() {
    super.createWrenObjects();

    this.computeWrenRenderable();

    let wrenMesh = _wr_static_mesh_unit_rectangle_new(false);

    _wr_renderable_set_mesh(this.wrenRenderable, wrenMesh);

    this.updateSize();
  }

  updateSize() {
    // allow the bounding sphere to scale down
    let scaleY = 0.1 * Math.min(this.size.x, this.size.y);

    let scale = _wrjs_color_array(this.size.x, scaleY, this.size.y);
    _wr_transform_set_scale(this.wrenNode, scale);
  }

  postFinalize() {
    super.postFinalize();
  }
}

export {WbPlane}
