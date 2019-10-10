import React, { Component } from 'react';
import { apiService } from '../services/';
import Card from '../components/Card';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';

export default class Layout extends Component {
	constructor() {
		super();
		this.state = {
			showInfo: null,
			favourites: [],
			showFavourites: false,
			filter: ''
		}

		this.addToFavourites = this.addToFavourites.bind(this)
		this.favouriteEpisode = this.favouriteEpisode.bind(this)
		this.showFavourites = this.showFavourites.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.episodesObject = this.episodesObject.bind(this)
	}

	getEpisodes() {
		apiService.get({
			route: 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
		}).then(res => {
			this.setState({ showInfo: res.data })
		});
	}

	addToFavourites(id) {
		console.log(id)
		const episodes = this.state.showInfo._embedded.episodes;

		let favouritesEpisodes = this.state.favourites;
		const episode = episodes.filter(item => item.id === id);

		const selected = favouritesEpisodes.filter(item => item.id === episode[0].id);

		if (selected.length < 1) {
			favouritesEpisodes.push(episode[0]);
			this.setState({ favourites: favouritesEpisodes })
		} else {
			const index = favouritesEpisodes.indexOf(episode[0])

			if (index > -1) {
				favouritesEpisodes.splice(index, 1);
			}

			this.setState({ favourites: favouritesEpisodes }, () => {
				if (this.state.favourites.length === 0) {
					this.setState({ showFavourites: false })
				}
			})
		}
	}

	favouriteEpisode(id) {
		const isFavourite = this.state.favourites.filter(item => item.id === id).length > 0 ? true : false;
		return isFavourite
	}

	showFavourites() {
		this.setState({ showFavourites: !this.state.showFavourites })
	}

	handleChange = event => {
		this.setState({ filter: event.target.value });
	};

	episodesObject(episodes) {
		if (this.state.filter && this.state.showInfo) {

			return episodes.filter(item => {
				return Object.keys(item).some(() =>
					item.name.toLowerCase().includes(this.state.filter)
				);
			});

		} else {
			return episodes
		}
	}

	componentDidMount() {
		this.getEpisodes()
	}

	render() {
		const episodes = this.state.showInfo && this.episodesObject(this.state.showInfo._embedded.episodes)
		const favourites = this.state.showInfo && this.episodesObject(this.state.favourites)
		const { showFavourites } = this.state;

		return (
			<div className="container">
				{this.state.showInfo &&
					<div className="py-5">
						<div className="d-flex align-items-center justify-content-between">
							<Title text={this.state.showInfo.name} key={'main-title'} />

							<input type="text" onChange={this.handleChange} value={this.state.filter} placeholder="search" className="px-2 py-1" />
						</div>
						<Paragraph description={this.state.showInfo.summary} key={'show-description'} />

						<div className="text-right">
							<button className="btn btn-primary btn-sm" onClick={this.showFavourites} disabled={favourites.length === 0}>
								{showFavourites ? 'Show All Episodes' : 'Show Favourite Episodes'}
							</button>
						</div>
					</div>
				}

				<div className="row">
					{episodes && !showFavourites
						? episodes.map((item, index) =>
							<Card episode={item} key={index} addAction={this.addToFavourites} isFavourite={this.favouriteEpisode(item.id)} />
						)
						: favourites && favourites.map((item, index) =>
							<Card episode={item} key={index} addAction={this.addToFavourites} isFavourite={this.favouriteEpisode(item.id)} />
						)
					}
				</div>
			</div>
		)
	}
}