import React from 'react'
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'

import DashboardsStore from 'stores/DashboardsStore'

@observer
class Settings extends React.Component {
  render() {
    var {dashboardId, widgetId} = this.props.data
    return (
      <div>
        <div className="section-body">
          <form noValidate autoComplete="off">
            <Typography variant="h6" gutterBottom>Widget settings</Typography>
            <TextField
              id="outlined-name"
              label="Name"
              value={_.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).customHeader}
              onChange={this.changeCustomHeader.bind(this)}
              variant="outlined"
              fullWidth
              className="mb-16"
            />
            <TextField
              id="outlined-name"
              label="Stock"
              value={_.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).data.stock}
              onChange={this.setWidgetData.bind(this, 'stock', 'value', 'toUpperCase')}
              variant="outlined"
              fullWidth
            />
          </form>
        </div>
        <Divider />
      </div>
    )
  }
  changeCustomHeader(e) {
    var {dashboardId, widgetId} = this.props.data
    DashboardsStore.setCustomHeader(dashboardId, widgetId, e.target.value)
  }
  setWidgetData(key, attr, fn, e) {
    var {dashboardId, widgetId} = this.props.data
    var value = e.target[attr]
    DashboardsStore.setWidgetData(dashboardId, widgetId, key, value.trim(), fn)
  }
}

export default Settings
