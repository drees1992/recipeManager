import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Collapse from "@material-ui/core/Collapse";

import { getUserRecipes } from "src/actions/recipe";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 260,
  },
  listRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // overflow: "hidden",
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: { width: "100%", maxHeight: "75vh" },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  cardRoot: {
    //minWidth: 345,
    //maxWidth: 345,
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));

const Dashboard = ({ session, getUserRecipes, recipe: { userRecipes } }) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getUserRecipes();
  }, [getUserRecipes]);

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Typography align="center" variant="body1">
                  Welcome back <b>{session.user.name}</b>!
                </Typography>
                <Typography align="center" variant="body1">
                  Your email: {session.user.email}
                </Typography>
                <img className={classes.centerFlexibleItem} src="" alt="" />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.listRoot}>
                <Grid container alignItems="center">
                  {userRecipes &&
                    userRecipes.map((recipeData) => (
                      <Grid
                        className={classes.gridItem}
                        item
                        key={recipeData._id}
                        xs={12}
                        sm={6}
                        lg={4}
                      >
                        <Card className={classes.cardRoot}>
                          <CardHeader title={recipeData.name} />
                          {recipeData.cover && (
                            <CardMedia
                              className={classes.media}
                              image={recipeData.cover.url}
                              title={recipeData.name}
                            />
                          )}
                          {!recipeData.cover && (
                            <CardMedia
                              className={classes.media}
                              image="https://source.unsplash.com/random"
                              title={recipeData.name}
                            />
                          )}
                          <CardContent>
                            <Typography variant="body2" paragraph>
                              {recipeData.description}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {recipeData.attribute.map((entry) => (
                                <Fragment key={entry.id}>
                                  <em>{entry.name}</em>{" "}
                                </Fragment>
                              ))}
                            </Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                            <IconButton aria-label="share">
                              <ShareIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  //auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
});

export default connect(mapStateToProps, { getUserRecipes })(Dashboard);
