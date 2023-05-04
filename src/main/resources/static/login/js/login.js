function login(){
    axios.get('/channel/' + this.channelCd)
        .then(response => {
            this.channel = response.data;
        });
}

