import BoxPlaying from './BoxPlaying/BoxPlaying';

function NowPlaying() {
    
    return ( 
        <>
            {/* now_playing */}
            <BoxPlaying title="Now Playing" type="now_playing"/>
                
            {/* top_rated */}
            <BoxPlaying title="Top Rating" type="top_rated"/>
            
            {/* popular */}
            <BoxPlaying title="Popular" type="popular"/>
        </>
     );
}

export default NowPlaying;