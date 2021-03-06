import React, { Fragment, PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Drawer, Hidden, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ListIcon from '@material-ui/icons/List'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import i18n from 'i18next'

const drawerWidth = 250

const styleSheet = theme => ({
  menuList: {
    width: drawerWidth,
    paddingTop: 0,
    flex: 1,
  },
  menuHeader: {
    '@media (min-width:0px) and (orientation: landscape)': {
      height: theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight,
    },
    '@media (min-width:600px)': {
      height: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
    },
    height: theme.mixins.toolbar.minHeight,
  },
  menuIcon: {
    marginLeft: -8,
  },
  drawerPaper: {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 8,
  },
})

class SideMenuComponent extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isSideMenuOpen: PropTypes.bool.isRequired,
    showSideMenu: PropTypes.func.isRequired,
    hideSideMenu: PropTypes.func.isRequired,
  }

  render() {
    const { classes, isSideMenuOpen, hideSideMenu } = this.props

    const drawerContent = (
      <List component="nav" onClick={hideSideMenu} className={classes.menuList}>
        <ListItem divider className={classes.menuHeader}>
          <ListItemText>
            <Typography variant="h6">
              {i18n.t('Main:title')}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton className={classes.menuIcon}>
              <MenuIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component={Link} to="/todos">
          <IconButton className={classes.menuIcon}>
            <ListIcon />
          </IconButton>
          <ListItemText primary={i18n.t('Navigation:todos')} />
        </ListItem>
      </List>
    )

    return (
      <Fragment>
        <Hidden xsDown>
          <Drawer
            variant="permanent"
            classes={{ paper: classNames(classes.drawerPaper, !isSideMenuOpen && classes.drawerPaperClose) }}
            open={isSideMenuOpen}
            onClose={hideSideMenu}
            ModalProps={{ keepMounted: true }}>
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            classes={{ paper: classNames(classes.drawerPaper, !isSideMenuOpen && classes.drawerPaperClose) }}
            open={isSideMenuOpen}
            onClose={hideSideMenu}
            ModalProps={{ keepMounted: true }}>
            {drawerContent}
          </Drawer>
        </Hidden>
      </Fragment>
    )
  }
}

export default withStyles(styleSheet)(SideMenuComponent)
