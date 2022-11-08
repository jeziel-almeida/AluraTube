import config from '../config.json';
import styled from 'styled-components';
import {CSSReset} from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import {StyledTimeline} from '../src/components/Timeline'

function HomePage() {
    
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    )
}

export default HomePage

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    background-size: cover;
    background-position: center;
    height: 230px;
`;

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>

            <StyledBanner bg={config.bg} />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} alt="foto-de-perfil" />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ playlists }) {

    const playlistsNames = Object.keys(playlists)

    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
  
                const videos = playlists[playlistName]
  
                return (
                    <section>
                        <h1>{playlistName.toUpperCase()}</h1>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}