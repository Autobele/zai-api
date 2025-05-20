import { Injectable, Logger } from '@nestjs/common';
import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    WASocket,
} from '@whiskeysockets/baileys';
import * as qrcode from 'qrcode';
import * as path from 'path';

@Injectable()
export class WhatsappService {
    private readonly logger = new Logger(WhatsappService.name);

    // Mapeia sockets por ID de usuário
    private sessions = new Map<string, WASocket>();
    private qrCodes = new Map<string, string>();
    private connected = new Set<string>();

    async connect(userId: string): Promise<void> {
        if (this.connected.has(userId)) {
            this.logger.log(`🟢 Usuário ${userId} já conectado.`);
            return;
        }

        const sessionDir = path.join(__dirname, '..', '..', 'credentials', userId);
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version } = await fetchLatestBaileysVersion();

        const sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: true,
        });

        this.sessions.set(userId, sock);

        sock.ev.on('creds.update', saveCreds);

        sock.ev.on('connection.update', async ({ connection, qr, lastDisconnect }) => {
            if (qr) {
                const qrImage = await qrcode.toDataURL(qr);
                this.qrCodes.set(userId, qrImage);
                this.logger.log(`📲 QR Code gerado para usuário ${userId}`);
            }

            if (connection === 'close') {
                const shouldReconnect =
                    (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut;
                this.logger.warn(`🔌 Conexão de ${userId} encerrada. Reconectando: ${shouldReconnect}`);
                this.connected.delete(userId);
                if (shouldReconnect) {
                    await this.connect(userId);
                }
            }

            if (connection === 'open') {
                this.logger.log(`✅ ${userId} conectado com sucesso.`);
                this.connected.add(userId);
            }
        });
    }

    getQrCode(userId: string): string {
        const qr = this.qrCodes.get(userId);
        if (!qr) throw new Error('QR Code ainda não gerado.');
        return qr;
    }

    isUserConnected(userId: string): boolean {
        return this.connected.has(userId);
    }

    async sendMessage(userId: string, jid: string, message: string) {
        const sock = this.sessions.get(userId);
        if (!sock) throw new Error('Sessão não encontrada para este usuário.');
        await sock.sendMessage(`${jid}@s.whatsapp.net`, { text: message });
    }
}
