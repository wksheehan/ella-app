import React, { Component } from "react";
import { Button } from "@material-ui/core";



function makeTitle(opened) {
    if (opened){
        return 'Cancel';
    }else{
        return 'Edit Profile';
    }
}


class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
        const { opened } = this.state;
        // const classes = useStyles();

		title = makeTitle(opened);

		return (
            
			<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
				<Button className="boxTitle" onClick={this.toggleBox}>
					{title}
				</Button>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;