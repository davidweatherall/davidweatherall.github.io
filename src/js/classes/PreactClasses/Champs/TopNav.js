import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';

import Filters from './methods/Filters';

import Patches from './Patches';
import Regions from './Regions';

@connect((store) => {
    return {
        stats: store.stats.stats,
        loading: store.stats.loading,
    }
})
class TopNav extends Component {

	constructor(props) {
		super(props);

        this.filters = new Filters(this.props.stats);

        this.regions = this.filters.getRegions();
        this.patches = this.filters.getPatches();
	}

	render() {
		return (
            <div>
                <div>
                    Patches: <Patches patches={this.patches}/>
                </div>
                <div>
                    Regions: <Regions regions={this.regions}/>
                </div>
            </div>
        );
    }
}


export default TopNav;