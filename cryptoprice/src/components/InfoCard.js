import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 200,
        marginTop: 40,
        marginBottom: 10
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    cover: {
        height: 90,
        width: 90,
        objectFit: 'contain',
        marginLeft: 20,
        marginTop: 20,

    },

});


const InfoCard = props => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image={props.logoUrl}
            />
            <CardContent>
                <Typography>
                    {props.name}
                </Typography>
                <Typography className={classes.price}>
                    NZ$ {props.price}
                </Typography>
                <Typography color="textSecondary">
                    {props.priceChange} ({props.priceChangePct}) 24h
                </Typography>
            </CardContent>

        </Card>
    )
}

export default InfoCard
