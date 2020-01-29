import React from 'react';

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import {Route} from "react-router-dom";

import CollectionPage from '../collection/collection.component';
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {updateCollections} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";


const CollectionsOverviewWithSpinner=WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner=WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    unsubscribeFromSnapshot = null;
    state={
        loading:true
    };

    componentDidMount() {


        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.get().then( snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading:false});
        });
    }

    render() {
        const {match}=this.props;
        const {loading} = this.state;
        return (

            <div className='shop-page'>
                 <Route exact path={`${match.path}`} render={props=>(<CollectionsOverviewWithSpinner isLoading={loading}{...props}/>)} />
                <Route exact path={`${match.path}/:collectionId`} render={props=>(<CollectionsPageWithSpinner isLoading={loading}{...props}/>)} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
        dispatch(updateCollections(collectionsMap))
});



export default connect(null,mapDispatchToProps)( ShopPage);
