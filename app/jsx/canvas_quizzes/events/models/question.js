/*
 * Copyright (C) 2021 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import Backbone from 'backbone'
import pickAndNormalize from '../../shared/models/common/pick_and_normalize'
import fromJSONAPI from '../../shared/models/common/from_jsonapi'
import K from '../constants'
import inflections from '../../shared/util/inflections'

const camelize = inflections.camelize

export default Backbone.Model.extend({
  parse(payload) {
    let attrs

    attrs = fromJSONAPI(payload, 'quiz_questions', true)
    attrs = pickAndNormalize(attrs, K.QUESTION_ATTRS)
    attrs.id = '' + attrs.id
    attrs.readableType = camelize(
      attrs.questionType.replace(/_question$/, '').replace(/_/g, ' '),
      false
    )

    return attrs
  }
})
