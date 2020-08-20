import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

class UserDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    deleteCustomer(email) {
        const variables = {
            email,
          }
          Axios.post('/api/users/removeFromUsers', variables)
          .then(response => {
            if(response.data.success){
              this.props.stateRefresh();
            } else {
              alert('리스트에서 지우는데 실패했습니다.')
            }
          })
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>

                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 유저 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.email)}}>삭제</Button>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}

export default UserDelete;