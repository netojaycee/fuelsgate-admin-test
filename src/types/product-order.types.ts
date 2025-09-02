
export interface ProductOrderDto {
    _id: string;
    trackingId: string;
    status: string;
    price: number | null;
    volume: number | null;
    isRated?: boolean;
    expiresIn?: string;
    createdAt: string;
    updatedAt: string;
    sellerId?: {
        _id: string;
        category?: string;
        userId?: string | {
            _id: string;
            firstName?: string;
            lastName?: string;
            status?: string;
            email?: string;
            averageRating?: number;
            lastSeen?: string;
            provider?: string | null;
            providerId?: string | null;
            createdAt?: string;
            updatedAt?: string;
        };
        businessName?: string;
        depotName?: string;
        phoneNumber?: string;
        profilePicture?: string | null;
        officeAddress?: string;
        depotHub?: string;
        products?: string[];
        createdAt?: string;
        updatedAt?: string;
    };
    buyerId?: {
        _id: string;
        category?: string;
        userId?: {
            _id: string;
            firstName?: string;
            lastName?: string;
            status?: string;
            email?: string;
            averageRating?: number;
            lastSeen?: string;
            provider?: string | null;
            providerId?: string | null;
            createdAt?: string;
            updatedAt?: string;
        };
        createdAt?: string;
        updatedAt?: string;
    };
    productUploadId?: {
        _id: string;
        sellerId?: string;
        productId?: {
            _id: string;
            name?: string;
            value?: string;
            color?: string;
            unit?: string;
            status?: string;
            createdAt?: string;
            updatedAt?: string;
        };
        depotHubId?: string;
        volume?: number;
        price?: number;
        depot?: string;
        expiresIn?: string;
        productQuality?: string | null;
        status?: string;
        createdAt?: string;
        updatedAt?: string;
        state?: string;
        city?: string;
    };
}
