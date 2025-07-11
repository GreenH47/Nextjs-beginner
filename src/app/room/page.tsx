'use client';

import {
    ControlBar,
    GridLayout,
    ParticipantTile,
    RoomAudioRenderer,
    useTracks,
    RoomContext,
} from '@livekit/components-react';
import { Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState, useCallback } from 'react';

export default function Page() {
    const roomName = 'quickstart-room';
    const userName = 'quickstart-user';

    const [room] = useState(
        () =>
            new Room({
                adaptiveStream: true,
                dynacast: true,
            }),
    );

    const [token, setToken] = useState<string | null>(null);

    /** Connect once we have a token */
    const connect = useCallback(
        async (tkn: string) => {
            const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
            if (!wsUrl) throw new Error('NEXT_PUBLIC_LIVEKIT_URL missing');
            await room.connect(wsUrl, tkn);
        },
        [room],
    );

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const resp = await fetch(
                    `/api/token?room=${roomName}&username=${userName}`,
                );
                const data: { token?: string } = await resp.json();
                if (!mounted) return;
                if (data.token) {
                    await connect(data.token);
                    setToken(data.token);            // <- save it
                }
            } catch (err) {
                console.error(err);
            }
        })();

        return () => {
            mounted = false;
            room.disconnect();
        };
    }, [roomName, userName, room, connect]);

    if (!token) {
        return <div>Getting token…</div>;
    }

    return (
        <RoomContext.Provider value={room}>
            <div data-lk-theme="default" style={{ height: '100dvh' }}>
                <MyVideoConference />
                <RoomAudioRenderer />
                <ControlBar />
            </div>
        </RoomContext.Provider>
    );
}

function MyVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );

    return (
        <GridLayout
            tracks={tracks}
            style={{ height: 'calc(100dvh - var(--lk-control-bar-height))' }}
        >
            <ParticipantTile />
        </GridLayout>
    );
}
